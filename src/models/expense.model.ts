import { z } from "zod";
import { categorySchema, expenseSchema } from "../types/category.types.js";
import { FastifySchema } from "fastify";

export const getCategorySchema: FastifySchema = {
    summary: "Get category expense",
    tags: ["Expenses"],
    response: {
        200: z.object({
            category: z.array(categorySchema),
        }),
    },
};

export const getExpenseSchema: FastifySchema = {
    summary: "Get expense",
    tags: ["Expenses"],
    response: {
        200: z.object({
            expenses: z.array(expenseSchema),
        }),
    },
};

export const expenseCreateSchema: FastifySchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    body: z.object({
        title: z.string(),
        notes: z.string(),
        price: z.number(),
        category_id: z.number(),
        group_id: z.number().nullable().optional(),
    }),
    response: {
        201: z.object({
            idExpense: z.number(),
        }),
    },
};