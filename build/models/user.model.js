"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.getUserSchema = void 0;
const zod_1 = require("zod");
exports.getUserSchema = {
    summary: "Get an user",
    tags: ["User"],
    security: [{ Bearer: [] }],
};
exports.createUserSchema = {
    summary: "Create an user",
    tags: ["User"],
    body: zod_1.z.object({
        full_name: zod_1.z.string().min(5),
        username: zod_1.z.string(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string(),
        birthday: zod_1.z.string(),
        password: zod_1.z.string({ message: "Informe uma senha!" }).min(8, {
            message: "A senha precisa conter no minimo 8 caracteres.",
        }),
        security_question: zod_1.z.string(),
        security_response: zod_1.z.string(),
    }),
    response: {
        201: zod_1.z.object({
            userId: zod_1.z.number(),
        }),
    },
};
exports.updateUserSchema = {
    summary: "Update an user",
    tags: ["User"],
    security: [{ Bearer: [] }],
    body: zod_1.z.object({
        full_name: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        birthday: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        security_question: zod_1.z.string().optional(),
        security_response: zod_1.z.string().optional(),
    }),
};
