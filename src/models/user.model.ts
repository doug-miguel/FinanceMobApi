import { z } from "zod";

export const createUserSchema = {
    schema: {
        summary: "Create an user",
        tags: ["User"],
        body: z.object({
            full_name: z.string({}).min(5),
            email: z.string().email(),
            phone: z.string(),
            birthday: z.string(),
            password: z.string({ message: "Informe uma senha!" }).min(8, {
                message: "A senha precisa conter no minimo 8 caracteres.",
            }),
            security_question: z.string(),
            security_response: z.string(),
        }),
        response: {
            201: z.object({
                userId: z.number(),
            }),
        },
    },
};