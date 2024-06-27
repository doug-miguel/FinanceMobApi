import { FastifyInstance } from 'fastify';

async function expensesVariableRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req, res) => {
        return 'expensesVariableRouter!';
    });

    fastify.get('/:id', async (req, res) => {
        return 'expensesVariableRouter por id!';
    });

    fastify.post('/create', async (req, res) => {
        return 'expensesVariableRouter cria!';
    });

    fastify.put('/update', async (req, res) => {
        return 'expensesVariableRouter atualizar!';
    });

    fastify.delete('/:id', async (req, res) => {
        return 'expensesVariableRouter deletar!';
    });
}

export default expensesVariableRouter;