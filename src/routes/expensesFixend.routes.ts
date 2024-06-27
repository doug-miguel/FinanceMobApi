import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function expensesFixendRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesFixendRouter!';
    });

    fastify.get('/:id', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesFixendRouter por id!';
    });

    fastify.post('/create', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesFixendRouter cria!';
    });

    fastify.put('/update', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesFixendRouter atualizar!';
    });

    fastify.delete('/:id', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesFixendRouter deletar!';
    });
}

export default expensesFixendRouter;