import { FastifySchema } from "fastify";
import { z } from "zod";

export const invitationGetSchema: FastifySchema = {
    summary: "invitation Get Send",
    tags: ["Invitation"],
    security: [{ Bearer: [] }],
};

export const invitationCreateSchema: FastifySchema = {
    summary: "invitation Create Send",
    tags: ["Invitation"],
    security: [{ Bearer: [] }],
    body: z.object({
        email: z.string(),
        group_id: z.number(),
    }),
    response: {
        200: z.object({
            invitationId: z.number(),
        }),
    },
};

export const invitationResponseSchema: FastifySchema = {
    summary: "invitation response Send",
    tags: ["Invitation"],
    security: [{ Bearer: [] }],
    body: z.object({
        id: z.number(),
        action: z.string(),
    }),
    response: {
        200: z.object({
            message: z.string(),
        }),
    },
};
