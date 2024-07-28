import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateUser, GetUser, ResetReqResUser, UpdateUser } from "../controllers/user.controller.js";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { createUserSchema, resetUserSchema, updateUserSchema } from "../models/user.model.js";
import { ResetRequest, UpdateUserRequest } from "../types/user.types.js";

async function userRouter(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/id/:id", GetUser);

  fastify.withTypeProvider<ZodTypeProvider>().post("/create", { schema: createUserSchema }, CreateUser);

  fastify.withTypeProvider<ZodTypeProvider>().put<UpdateUserRequest>("/update", {
    preHandler: ValidateAuthenticate,
    schema: updateUserSchema
  }, UpdateUser);

  fastify.withTypeProvider<ZodTypeProvider>().post<ResetRequest>('/validatereq', {
    preHandler: ValidateAuthenticate,
    schema: resetUserSchema
  }, ResetReqResUser)
}

export default userRouter;
