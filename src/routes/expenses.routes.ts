import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getCategorySchema } from '../models/expense.model.js';
import { GetCategory } from '../controllers/expense.controller.js';
import { ValidateAuthenticate } from '../middlewares/auth.middlewares.js';

async function expensesRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get("", { preHandler: ValidateAuthenticate, schema: getCategorySchema }, GetCategory);
}

export default expensesRouter;