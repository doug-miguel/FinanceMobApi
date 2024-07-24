import { z } from "zod";

export const authSchema = {
    schema: {
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
    },
};