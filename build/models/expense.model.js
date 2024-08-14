"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseDeleteSchema = exports.expenseUpdateSchema = exports.expenseCreateSchema = exports.getExpenseSchema = exports.getCategorySchema = void 0;
const zod_1 = require("zod");
const category_types_js_1 = require("../types/category.types.js");
exports.getCategorySchema = {
    summary: "Get category expense",
    tags: ["Category"],
    security: [{ Bearer: [] }],
    response: {
        200: zod_1.z.object({
            category: zod_1.z.array(category_types_js_1.categorySchema),
        }),
    },
};
exports.getExpenseSchema = {
    summary: "Get expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    response: {
        200: zod_1.z.object({
            expenses: zod_1.z.array(category_types_js_1.expenseSchema),
        }),
    },
};
exports.expenseCreateSchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    body: zod_1.z.object({
        title: zod_1.z.string(),
        notes: zod_1.z.string(),
        price: zod_1.z.number(),
        category_id: zod_1.z.number(),
        user_group: zod_1.z.number().nullable().optional(),
    }),
    response: {
        201: zod_1.z.object({
            idExpense: zod_1.z.number(),
        }),
    },
};
exports.expenseUpdateSchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    body: zod_1.z.object({
        id: zod_1.z.number(),
        title: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        category_id: zod_1.z.number().optional(),
        user_group: zod_1.z.number().nullable().optional(),
    }),
    response: {
        200: zod_1.z.object({
            message: zod_1.z.string(),
        }),
    },
};
exports.expenseDeleteSchema = {
    summary: "Create expense expense",
    tags: ["Expenses"],
    security: [{ Bearer: [] }],
    response: {
        200: zod_1.z.object({
            message: zod_1.z.string(),
        }),
    },
};
