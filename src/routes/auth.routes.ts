import { FastifyInstance } from 'fastify';

async function authRouter(fastify: FastifyInstance) {
    fastify.post('/create', async (req, res) => {
        return 'authRouter cria!';
    });

    fastify.put('/update', async (req, res) => {
        return 'authRouter atualizar!';
    });

    fastify.post('/login', async (req, res) => {
        return 'authRouter login!';
    });
}

export default authRouter;