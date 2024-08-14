"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserSchema = exports.authSchema = void 0;
const zod_1 = require("zod");
exports.authSchema = {
    summary: "Login user",
    tags: ["Auth"],
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string({ message: "Informe uma senha!" }).min(8, {
            message: "A senha precisa conter no minimo 8 caracteres.",
        }),
    }),
    response: {
        200: zod_1.z.object({
            token: zod_1.z.string(),
        }),
    },
};
exports.resetUserSchema = {
    summary: "Reset an user",
    tags: ["Auth"],
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        security_question: zod_1.z.string(),
        security_response: zod_1.z.string(),
    }),
    response: {
        200: zod_1.z.object({
            token: zod_1.z.string(),
        }),
    },
};
