import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { expenseCreateSchema, getCategorySchema } from '../models/expense.model.js';
import { ValidateAuthenticate } from '../middlewares/auth.middlewares.js';
import { ExpenseRequest } from '../types/expense.types.js';
import { CreateExpensePost, GetCategory } from '../controllers/expense.controller.js';

async function expensesRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().post<ExpenseRequest>("/expensecreate", { preHandler: ValidateAuthenticate, schema: expenseCreateSchema }, CreateExpensePost);
    fastify.withTypeProvider<ZodTypeProvider>().get("/category", { preHandler: ValidateAuthenticate, schema: getCategorySchema }, GetCategory);
}

export default expensesRouter;