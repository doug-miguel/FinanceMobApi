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