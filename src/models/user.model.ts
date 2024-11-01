import { FastifySchema } from "fastify";
import { z } from "zod";

export const getUserSchema: FastifySchema = {
  summary: "Get an user",
  tags: ["User"],
  security: [{ Bearer: [] }],
};

export const createUserSchema: FastifySchema = {
  summary: "Create an user",
  tags: ["User"],
  body: z.object({
    full_name: z.string().min(5),
    username: z.string(),
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
};

export const updateUserSchema: FastifySchema = {
  summary: "Update an user",
  tags: ["User"],
  security: [{ Bearer: [] }],
  body: z.object({
    full_name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    birthday: z.string().optional(),
    password: z.string().optional(),
    security_question: z.string().optional(),
    security_response: z.string().optional(),
  }),
};
