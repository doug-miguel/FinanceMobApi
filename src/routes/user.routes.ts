import { FastifyInstance } from 'fastify';

async function userRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req, res) => {
        return 'userRouter!';
    });

    fastify.get('/:id', async (req, res) => {
        return 'userRouter por id!';
    });

    fastify.post('/create', async (req, res) => {
        return 'userRouter cria!';
    });

    fastify.put('/update', async (req, res) => {
        return 'userRouter atualizar!';
    });

    fastify.delete('/:id', async (req, res) => {
        return 'userRouter deletar!';
    });
}

export default userRouter;