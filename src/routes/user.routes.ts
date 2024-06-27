import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function userRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        return 'authRouter!';
    });

    fastify.get('/:id', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter por id!';
    });

    fastify.post('/create', async (req: FastifyRequest, res: FastifyReply) => {
        console.log("🚀 ~ fastify.get ~ req:", req.body);

        return res.status(200).send({ usuario: 'Sem usuario' });
    });

    fastify.put('/update', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter atualizar!';
    });

    fastify.delete('/:id', async (req: FastifyRequest, res: FastifyReply) => {
        return 'expensesVariableRouter deletar!';
    });
}

export default userRouter;