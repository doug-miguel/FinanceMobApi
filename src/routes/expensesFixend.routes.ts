import { FastifyInstance } from 'fastify';

async function expensesFixendRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req, res) => {
        return 'expensesFixendRouter!';
    });

    fastify.get('/:id', async (req, res) => {
        return 'expensesFixendRouter por id!';
    });

    fastify.post('/create', async (req, res) => {
        return 'expensesFixendRouter cria!';
    });

    fastify.put('/update', async (req, res) => {
        return 'expensesFixendRouter atualizar!';
    });

    fastify.delete('/:id', async (req, res) => {
        return 'expensesFixendRouter deletar!';
    });
}

export default expensesFixendRouter;