import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BadRequest } from '../Errors/bad-request.js';
import { CreateUserRequest, UpdateUserRequest, DecocoTokenProps, UserProps } from '../types/user.types.js';

const prisma = new PrismaClient();

export async function CreateUser(req: FastifyRequest<CreateUserRequest>, res: FastifyReply) {
    const {
        full_name,
        username,
        email,
        phone,
        birthday,
        password,
        security_question,
        security_response,
    } = req.body;

    const existsUserEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existsUserEmail !== null) {
        throw new BadRequest("Já existe um usuário com este e-mail!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            full_name,
            email,
            username,
            phone,
            birthday,
            password: hashedPassword,
            security_question,
            security_response,
        },
    });

    return res.status(201).send({ userId: user.id });
};

export async function UpdateUser(req: FastifyRequest<UpdateUserRequest>, res: FastifyReply) {
    try {
        const {
            full_name,
            username,
            email,
            phone,
            birthday,
            password,
            security_question,
            security_response,
        } = req.body;

        const { id }: DecocoTokenProps = await req.jwtDecode();

        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            throw new BadRequest('Usuário não encontrado');
        }

        if (email && email !== existingUser.email) {
            const userWithEmail = await prisma.user.findUnique({
                where: { email },
            });

            if (userWithEmail) {
                throw new BadRequest('Já existe um usuário com este e-mail');
            }
        }

        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const data: UserProps = {};

        if (full_name) data.full_name = full_name;
        if (username) data.username = username;
        if (email) data.email = email;
        if (phone) data.phone = phone;
        if (birthday) data.birthday = birthday;
        if (password) data.password = hashedPassword;
        if (security_question) data.security_question = security_question;
        if (security_response) data.security_response = security_response;

        await prisma.user.update({
            where: { id },
            data,
        });

        return res.status(200).send({ message: 'Usuário atualizado' });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message })
    }

}
