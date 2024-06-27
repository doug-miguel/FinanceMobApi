import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function expensesVariableRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter!';
    });

    fastify.get('/:id', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter por id!';
    });

    fastify.post('/create', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter cria!';
    });

    fastify.put('/update', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter atualizar!';
    });

    fastify.delete('/:id', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter deletar!';
    });
}

export default expensesVariableRouter;