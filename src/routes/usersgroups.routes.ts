import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetUsersGroups } from "../controllers/usersgroups.controller.js";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { getUsersGroupsSchema } from "../models/usersgroups.model.js";
import { Params } from "@/types/generic.types.js";

async function usersGroupsRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get<{ Params: Params }>("/:id",
        { preHandler: ValidateAuthenticate, schema: getUsersGroupsSchema }, GetUsersGroups);
};

export default usersGroupsRouter;