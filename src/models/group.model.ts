import { FastifySchema } from "fastify";
import { z } from "zod";

export const getGroupSchema: FastifySchema = {
    summary: "Get group",
    tags: ["Group"],
    security: [{ Bearer: [] }],
};

export const createGroupSchema: FastifySchema = {
    summary: "Create group",
    tags: ["Group"],
    security: [{ Bearer: [] }],
    body: z.object({
        description: z.string(),
        active: z.number(),
    }),
    response: {
        201: z.object({
            idGroup: z.number(),
        }),
    },
};