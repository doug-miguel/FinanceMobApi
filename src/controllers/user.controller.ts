import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BadRequest } from '../Errors/bad-request.js';
import { DecodePayloadType } from '@fastify/jwt';

const prisma = new PrismaClient();

interface CreateUserRequest {
    Body: {
        full_name: string;
        username: string;
        email: string;
        phone: string;
        birthday: string;
        password: string;
        security_question: string;
        security_response: string;
    };
}

export interface DecocoTokenProps {
    id: number
    name: string
    email: string
    username: string
    iat: number
    exp: number
}

interface UpdateUserRequest {
    Body: {
        full_name?: string;
        username?: string;
        email?: string;
        phone?: string;
        birthday?: string;
        password?: string;
        security_question?: string;
        security_response?: string;
    };
}

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

    if (email !== existingUser.email) {
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

    await prisma.user.update({
        where: { id },
        data: {
            full_name,
            username,
            email,
            phone,
            birthday,
            password: hashedPassword,
            security_question,
            security_response,
        },
    });

    return res.status(200).send({ message: 'Usuário atualizado' });
}
