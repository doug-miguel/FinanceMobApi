import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(),
    category_name: z.string(),
});

export const expenseSchema = z.object({
    id: z.number(),
    price: z.number(),
    title: z.string(),
    notes: z.string(),
    category_id: z.number(),
    user_id: z.number(),
    group_id: z.number().nullable().optional(),
    created_at: z.date(),
    update_at: z.date(),
});