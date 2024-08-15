import { FastifyReply, FastifyRequest } from 'fastify';
import { Unauthorized } from '../Errors/unauthorized.js';

export const ValidateAuthenticate = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer /i, '');
        if (!token) {
            res.status(401).send(new Unauthorized('Não autorizado - Token não encontrado.'));
            return;
        }

        const decodedToken: any = await req.jwtVerify();
        if (!decodedToken) {
            res.status(401).send(new Unauthorized('Não autorizado - Token inválido.'));
            return;
        }
    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message });
    }
};