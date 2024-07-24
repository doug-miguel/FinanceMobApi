import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserSchema, updateUserSchema } from "../models/user.model.js";
import { CreateUser, UpdateUser } from "../controllers/user.controller.js";

async function userRouter(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/create", createUserSchema, CreateUser);
  fastify.withTypeProvider<ZodTypeProvider>().put("/update", updateUserSchema, UpdateUser);
}

export default userRouter;
