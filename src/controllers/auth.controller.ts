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
    const { email, password } = req.body;

    const existsUserEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!existsUserEmail) throw new BadRequest("Usúario não encontrado");
    const comparePassword = await bcrypt.compare(password, existsUserEmail.password);
    if (!comparePassword) throw new BadRequest("Senha incorreta");

    const payload = {
        id: existsUserEmail.id,
        name: existsUserEmail.full_name,
        email: existsUserEmail.email,
        username: existsUserEmail.username
    };

    const token = await res.jwtSign(payload, { expiresIn: '30m' });

    return res.status(200).send({ token });
}