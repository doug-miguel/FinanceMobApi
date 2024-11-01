import { FastifySchema } from "fastify";
import { z } from "zod";

export const authSchema: FastifySchema = {
    summary: "Login user",
    tags: ["Auth"],
    body: z.object({
        email: z.string().email(),
        password: z.string({ message: "Informe uma senha!" }).min(8, {
            message: "A senha precisa conter no minimo 8 caracteres.",
        }),
    }),
    response: {
        200: z.object({
            token: z.string(),
        }),
    },
};

export const resetUserSchema: FastifySchema = {
    summary: "Reset an user",
    tags: ["Auth"],
    body: z.object({
        email: z.string().email(),
        security_question: z.string(),
        security_response: z.string(),
    }),
    response: {
        200: z.object({
            token: z.string(),
        }),
    },
};