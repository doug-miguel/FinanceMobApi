import { FastifyRequest, FastifyReply } from 'fastify';

interface IdRequest {
    Body: {
        id: number
    };
}

export const ValidateAuthenticate = async (req: FastifyRequest<IdRequest>, res: FastifyReply, done: () => void) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer /i, '');
        if (!token) return res.code(401).send({ message: 'Não autorizado - Token não encontrado' });

        const decodedToken: any = await req.jwtVerify();
        if (!decodedToken) return res.code(401).send({ message: 'Não autorizado - Token inválido' });

        if (decodedToken.id !== req.body.id) {
            return res.code(403).send({ message: 'Token não corresponde ao usuário' });
        }

        return done();
    } catch (error) {
        res.code(500).send({ message: 'Erro ao verificar o token' });
    }
};
