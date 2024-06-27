import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function authRouter(fastify: FastifyInstance) {
    fastify.post('/create', async (req: FastifyRequest, res: FastifyReply) => {
        return 'authRouter cria!';
    });

    fastify.put('/update', async (req: FastifyRequest, res: FastifyReply) => {
        return 'authRouter atualizar!';
    });

    fastify.post('/login', async (req: FastifyRequest, res: FastifyReply) => {
        return 'authRouter login!';
    });
}

export default authRouter;