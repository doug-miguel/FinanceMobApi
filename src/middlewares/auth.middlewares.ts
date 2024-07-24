import { FastifyReply, FastifyRequest } from 'fastify';
import { Unauthorized } from '../Errors/unauthorized.js';

interface IdRequest {
    Body: {
        id: number
    };
}

export const ValidateAuthenticate = async (req: FastifyRequest<IdRequest>, res: FastifyReply, done: () => void) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer /i, '');
        if (!token) throw new Unauthorized('Não autorizado - Token não encontrado.');

        const decodedToken: any = await req.jwtVerify();
        if (!decodedToken) throw new Unauthorized('Não autorizado - Token inválido.');

        return done();
    } catch (error: any) {
        return res.status(error.statusCode).send({message: error.message})
    }
};
