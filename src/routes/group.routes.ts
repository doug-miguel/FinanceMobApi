import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { createGroupSchema, getGroupSchema, updateGroupSchema } from "../models/group.model.js";
import { GroupByIdGet, GroupCreatePost, GroupUpdatePut } from "../controllers/group.controller.js";
import { Params } from "../types/generic.types.js";
import { CreateGroup, UpdateGroup } from "../types/group.types.js";

async function groupRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get<{ Params: Params }>("/groupId/:id",
        { preHandler: ValidateAuthenticate, schema: getGroupSchema }, GroupByIdGet);

    fastify.withTypeProvider<ZodTypeProvider>().post<CreateGroup>("/creategroup",
        { preHandler: ValidateAuthenticate, schema: createGroupSchema }, GroupCreatePost);

    fastify.withTypeProvider<ZodTypeProvider>().put<UpdateGroup>("/updategroup",
        { preHandler: ValidateAuthenticate, schema: updateGroupSchema }, GroupUpdatePut);
}

export default groupRouter;