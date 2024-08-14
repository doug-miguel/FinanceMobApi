"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseSchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    id: zod_1.z.number(),
    category_name: zod_1.z.string(),
});
exports.expenseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    price: zod_1.z.number(),
    title: zod_1.z.string(),
    notes: zod_1.z.string(),
    category_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    group_id: zod_1.z.number().nullable().optional(),
    created_at: zod_1.z.date(),
    update_at: zod_1.z.date(),
});
