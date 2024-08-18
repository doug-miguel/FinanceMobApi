import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt';

import { prisma } from "../lib/prisma.js";
import { BadRequest } from "../Errors/bad-request.js";
import { AuthRequest, ResetRequest } from "../types/auth.types.js";

export async function Auth(req: FastifyRequest<AuthRequest>, res: FastifyReply) {
    try {
        const { email, password } = req.body;

        const existsUserEmail = await prisma.user.findUnique({
            where: {
                email: email.toLocaleLowerCase(),
            },
        });

        if (!existsUserEmail) return new BadRequest("Usúario não encontrado");
        const comparePassword = await bcrypt.compare(password, existsUserEmail.password);
        if (!comparePassword) return new BadRequest("Senha incorreta");

        const payload = {
            id: existsUserEmail.id,
            name: existsUserEmail.full_name,
            email: existsUserEmail.email,
            username: existsUserEmail.username
        };

        const token = await res.jwtSign(payload, { expiresIn: '2h' });

        return res.status(200).send({ token });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};

export async function ResetReqResUser(req: FastifyRequest<ResetRequest>, res: FastifyReply) {
    try {
        const {
            email,
            security_question,
            security_response,
        } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLocaleLowerCase() },
        });

        if (!existingUser) {
            return new BadRequest('Usuário não encontrado');
        };

        if (existingUser.security_question !== security_question) {
            return new BadRequest('Pergunta informada incorreta');
        };

        if (existingUser.security_response !== security_response) {
            return new BadRequest('Resposta informada incorreta');
        };

        const payload = {
            id: existingUser.id,
            name: existingUser.full_name,
            email: existingUser.email,
            username: existingUser.username
        };

        const token = await res.jwtSign(payload, { expiresIn: '2h' });

        return res.status(200).send({ token });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};