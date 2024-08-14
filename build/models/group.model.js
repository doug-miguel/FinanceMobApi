"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroupSchema = exports.createGroupSchema = exports.getGroupSchema = void 0;
const zod_1 = require("zod");
exports.getGroupSchema = {
    summary: "Get group",
    tags: ["Group"],
    security: [{ Bearer: [] }],
};
exports.createGroupSchema = {
    summary: "Create group",
    tags: ["Group"],
    security: [{ Bearer: [] }],
    body: zod_1.z.object({
        description: zod_1.z.string(),
        active: zod_1.z.number(),
    }),
    response: {
        201: zod_1.z.object({
            idGroup: zod_1.z.number(),
        }),
    },
};
exports.updateGroupSchema = {
    summary: "Update group",
    tags: ["Group"],
    security: [{ Bearer: [] }],
    body: zod_1.z.object({
        id: zod_1.z.number(),
        description: zod_1.z.string().optional(),
        active: zod_1.z.number().optional(),
    }),
    response: {
        201: zod_1.z.object({
            message: zod_1.z.string(),
        }),
    },
};
