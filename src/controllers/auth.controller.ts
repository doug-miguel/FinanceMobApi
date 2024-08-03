import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt';

import { prisma } from "../lib/prisma.js";
import { BadRequest } from "../Errors/bad-request.js";

interface AuthRequest {
    Body: {
        email: string;
        password: string;
    }
}

export async function Auth(req: FastifyRequest<AuthRequest>, res: FastifyReply) {
    try {
        const { email, password } = req.body;

        const existsUserEmail = await prisma.user.findUnique({
            where: {
                email,
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