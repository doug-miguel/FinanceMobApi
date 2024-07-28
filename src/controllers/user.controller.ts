import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BadRequest } from '../Errors/bad-request.js';
import { CreateUserRequest, UpdateUserRequest, ResetRequest, Params } from '../types/user.types.js';
import { DecodeTokenProps } from '../types/auth.types.js';

const prisma = new PrismaClient();

export async function GetUser(req: FastifyRequest<{ Params: Params }>, res: FastifyReply) {
    const idParams = +req.params.id;
    const { id }: DecodeTokenProps = await req.jwtDecode();

    if (idParams !== id) {
        throw new BadRequest("Usúario diferente das informações do token!");
    }

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    const { password, ...userWithoutPassword }: any = existingUser;

    return res.status(200).send(userWithoutPassword);
};

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

        const { id }: DecodeTokenProps = await req.jwtDecode();

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

        const data: Partial<UpdateUserRequest['Body']> = {};

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
        return res.status(error.statusCode).send({ message: error.message });
    }
}

export async function ResetReqResUser(req: FastifyRequest<ResetRequest>, res: FastifyReply) {
    const {
        security_question,
        security_response,
    } = req.body;

    const { id }: DecodeTokenProps = await req.jwtDecode();

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new BadRequest('Usuário não encontrado');
    }

    if (existingUser.security_question !== security_question) {
        throw new BadRequest('Pergunta informada incorreta');
    }

    if (existingUser.security_response !== security_response) {
        throw new BadRequest('Resposta informada incorreta');
    }

    return res.status(200).send({ validate: true });
}