import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetUsersGroups } from "../controllers/usersgroups.controller.js";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { getUsersGroupsSchema } from "../models/usersgroups.model.js";

async function usersGroupsRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get("",
        { preHandler: ValidateAuthenticate, schema: getUsersGroupsSchema }, GetUsersGroups);
};

export default usersGroupsRouter;