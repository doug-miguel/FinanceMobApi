import { FastifyRequest, FastifyReply } from 'fastify';

export const ValidateAuthenticate = async (req: FastifyRequest, res: FastifyReply, done: () => void) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer /i, '');
        if (!token) return res.code(401).send({ message: 'Não autorizado - Token não encontrado' });

        const decodedToken = req.jwtVerify();
        if (!decodedToken) return res.code(401).send({ message: 'Não autorizado - Token inválido' });

        return done();
    } catch (error) {
        res.code(500).send({ message: 'Erro ao verificar o token' });
    }
};
