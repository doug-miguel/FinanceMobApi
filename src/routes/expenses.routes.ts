import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { expenseCreateSchema, expenseDeleteSchema, expenseUpdateSchema, getCategorySchema, getExpenseSchema } from '../models/expense.model.js';
import { ValidateAuthenticate } from '../middlewares/auth.middlewares.js';
import { ExpenseRequest, ExpenseUpdateRequest } from '../types/expense.types.js';
import { CreateExpensePost, ExpenseGet, GetCategory, UpdateExpensePut, DeleteExpense } from '../controllers/expense.controller.js';
import { Params } from '../types/generic.js';

async function expensesRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get<{ Params: Params }>("/expensesId", { preHandler: ValidateAuthenticate, schema: getExpenseSchema }, ExpenseGet);
    fastify.withTypeProvider<ZodTypeProvider>().get("/category", { preHandler: ValidateAuthenticate, schema: getCategorySchema }, GetCategory);
    fastify.withTypeProvider<ZodTypeProvider>().post<ExpenseRequest>("/expensecreate", { preHandler: ValidateAuthenticate, schema: expenseCreateSchema }, CreateExpensePost);
    fastify.withTypeProvider<ZodTypeProvider>().put<ExpenseUpdateRequest>("/expenseupdate", { preHandler: ValidateAuthenticate, schema: expenseUpdateSchema }, UpdateExpensePut);
    fastify.withTypeProvider<ZodTypeProvider>().delete<{ Params: Params }>("/expensedelete/:id", { preHandler: ValidateAuthenticate, schema: expenseDeleteSchema }, DeleteExpense);
};

export default expensesRouter;