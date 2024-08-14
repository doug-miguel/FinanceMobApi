import { FastifySchema } from "fastify";

export const getUsersGroupsSchema: FastifySchema = {
    summary: "Get an Users Groups",
    tags: ["Users Groups"],
    security: [{ Bearer: [] }],
};