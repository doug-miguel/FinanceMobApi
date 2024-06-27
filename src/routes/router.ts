import { FastifyInstance } from 'fastify';
import authRouter from './auth.routes.js'
import expensesFixendRouter from './expensesFixend.routes.js';
import expensesVariableRouter from './expensesVariable.routes.js';
import userRouter from './user.routes.js';

async function router(fastify: FastifyInstance) {
    fastify.register(authRouter, { prefix: 'api/v1/auth' });
    fastify.register(userRouter, { prefix: 'api/v1/user' });
    fastify.register(expensesFixendRouter, { prefix: 'api/v1/expensesFixend' });
    fastify.register(expensesVariableRouter, { prefix: 'api/v1/expensesVariable' });
}

export default router;
