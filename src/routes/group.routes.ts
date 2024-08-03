import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { createGroupSchema, getGroupSchema } from "../models/group.model.js";
import { GroupByIdGet, GroupCreatePost } from "../controllers/group.controller.js";
import { Params } from "../types/generic.types.js";
import { CreateGroup } from "../types/group.types.js";

async function groupRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get<{ Params: Params }>("/groupId/:id", { preHandler: ValidateAuthenticate, schema: getGroupSchema }, GroupByIdGet);
    fastify.withTypeProvider<ZodTypeProvider>().post<CreateGroup>("/creategroup", { preHandler: ValidateAuthenticate, schema: createGroupSchema }, GroupCreatePost);
}

export default groupRouter;