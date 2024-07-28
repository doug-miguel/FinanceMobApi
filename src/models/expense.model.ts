import { z } from "zod";
import { categorySchema } from "../types/category.types.js";
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

export const expenseCreateSchema: FastifySchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    body: z.object({
        title: z.string(),
        notes: z.string(),
        price: z.number(),
        category_id: z.number(),
        group_id: z.number().optional(),
    }),
    response: {
        201: z.object({
            idExpense: z.number(),
        }),
    },
};