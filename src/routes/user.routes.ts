import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { BadRequest } from "../Errors/bad-request.js";
import { prisma } from "../lib/prisma.js";

async function userRouter(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {},
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      return "authRouter!";
    }
  );

  fastify.get("/:id", async (req: FastifyRequest, res: FastifyReply) => {
    return "expensesVariableRouter por id!";
  });

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/create",
    {
      schema: {
        summary: "Create an user",
        tags: ["User"],
        body: z.object({
          full_name: z.string().min(5),
          email: z.string().email(),
          phone: z.string(),
          birthday: z.string(),
          password: z.string(),
          security_question: z.string(),
          security_response: z.string(),
        }),
        response: {
          201: z.object({
            userId: z.number(),
          }),
        },
      },
    },
    async (req, res) => {
      const {
        full_name,
        email,
        phone,
        birthday,
        password,
        security_question,
        security_response,
      } = req.body;

      const existsUserEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existsUserEmail !== null) {
        throw new BadRequest("Já existe um usuário com este e-mail!");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          full_name,
          email,
          phone,
          birthday,
          password: hashedPassword,
          security_question,
          security_response,
        },
      });

      return res.status(201).send({ userId: user.id });
    }
  );

  fastify.put("/update", async (req: FastifyRequest, res: FastifyReply) => {
    return "expensesVariableRouter atualizar!";
  });

  fastify.delete("/:id", async (req: FastifyRequest, res: FastifyReply) => {
    return "expensesVariableRouter deletar!";
  });
}

export default userRouter;
