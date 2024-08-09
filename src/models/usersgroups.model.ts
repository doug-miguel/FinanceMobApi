import { FastifySchema } from "fastify";

export const getUsersGroupsSchema: FastifySchema = {
    summary: "Get an User_Groups",
    tags: ["User_Groups"],
    security: [{ Bearer: [] }],
};