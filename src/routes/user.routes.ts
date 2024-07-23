import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserSchema } from "../models/user.model.js";
import { CreateUser } from "../controllers/user.controller.js";

async function userRouter(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/create", createUserSchema, CreateUser);

  // fastify.withTypeProvider<ZodTypeProvider>().get("/",
  //   {
  //     schema: {},
  //   },
  //   async (req: FastifyRequest, res: FastifyReply) => {
  //     return "authRouter!";
  //   }
  // );

  // fastify.get("/", async (req: FastifyRequest, res: FastifyReply) => {
  //   return "expensesVariableRouter por id!";
  // });


  // fastify.put("/update", async (req: FastifyRequest, res: FastifyReply) => {
  //   return "expensesVariableRouter atualizar!";
  // });

  // fastify.delete("/:id", async (req: FastifyRequest, res: FastifyReply) => {
  //   return "expensesVariableRouter deletar!";
  // });
}

export default userRouter;
