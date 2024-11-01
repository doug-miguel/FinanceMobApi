import { FastifySchema } from "fastify";
import { z } from "zod";
import { categorySchema, expenseSchema } from "../types/category.types.js";

export const getCategorySchema: FastifySchema = {
    summary: "Get category expense",
    tags: ["Category"],
    security: [{ Bearer: [] }],
    response: {
        200: z.object({
            category: z.array(categorySchema),
        }),
    },
};

export const getExpenseSchema: FastifySchema = {
    summary: "Get expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    response: {
        200: z.object({
            expenses: z.array(expenseSchema),
        }),
    },
};

export const expenseCreateSchema: FastifySchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    body: z.object({
        title: z.string(),
        notes: z.string(),
        price: z.number(),
        category_id: z.number(),
        user_group: z.number().nullable().optional(),
    }),
    response: {
        201: z.object({
            idExpense: z.number(),
        }),
    },
};

export const expenseUpdateSchema: FastifySchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    body: z.object({
        id: z.number(),
        title: z.string().optional(),
        notes: z.string().optional(),
        price: z.number().optional(),
        category_id: z.number().optional(),
        user_group: z.number().nullable().optional(),
    }),
    response: {
        200: z.object({
            message: z.string(),
        }),
    },
};

export const expenseDeleteSchema: FastifySchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    response: {
        200: z.object({
            message: z.string(),
        }),
    },
};