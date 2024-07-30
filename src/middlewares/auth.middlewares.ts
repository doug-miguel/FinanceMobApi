import { FastifyReply, FastifyRequest } from 'fastify';
import { Unauthorized } from '../Errors/unauthorized.js';

export const ValidateAuthenticate = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer /i, '');
        if (!token) {
            throw new Unauthorized('Não autorizado - Token não encontrado.');
        };

        const decodedToken: any = await req.jwtVerify();
        if (!decodedToken) {
            throw new Unauthorized('Não autorizado - Token inválido.');
        };

        return;
    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message });
    };
};