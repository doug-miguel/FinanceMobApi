import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateUser, UpdateUser } from "../controllers/user.controller.js";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { createUserSchema, updateUserSchema } from "../models/user.model.js";
import { UpdateUserRequest } from "../types/user.types.js";

async function userRouter(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/create", { schema: createUserSchema }, CreateUser);
  fastify.withTypeProvider<ZodTypeProvider>().put<UpdateUserRequest>("/update", {
    preHandler: ValidateAuthenticate,
    schema: updateUserSchema
  }, UpdateUser);
}

export default userRouter;
