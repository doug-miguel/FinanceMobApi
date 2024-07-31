import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { expenseCreateSchema, getCategorySchema, getExpenseSchema } from '../models/expense.model.js';
import { ValidateAuthenticate } from '../middlewares/auth.middlewares.js';
import { ExpenseRequest } from '../types/expense.types.js';
import { CreateExpensePost, ExpenseGet, GetCategory } from '../controllers/expense.controller.js';
import { Params } from '../types/generic.js';

async function expensesRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().post<ExpenseRequest>("/expensecreate", { preHandler: ValidateAuthenticate, schema: expenseCreateSchema }, CreateExpensePost);
    fastify.withTypeProvider<ZodTypeProvider>().get<{ Params: Params }>("/expensesId", { preHandler: ValidateAuthenticate, schema: getExpenseSchema }, ExpenseGet);
    fastify.withTypeProvider<ZodTypeProvider>().get("/category", { preHandler: ValidateAuthenticate, schema: getCategorySchema }, GetCategory);
};

export default expensesRouter;