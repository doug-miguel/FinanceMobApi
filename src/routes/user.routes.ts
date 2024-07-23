import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

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
        body: z.object({
          full_name: z.string().min(5),
          email: z.string().email(),
          phone: z.string(),
          birthday: z.string().date(),
          password: z.string(),
          security_question: z.string().min(5),
          security_response: z.string().min(5),
        }),
        response: {
          201: z.object({
            userId: z.number(),
          }),
        },
      },
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      console.log("🚀 ~ fastify.get ~ req:", req.body);

      return res.status(200).send({ usuario: "Sem usuario" });
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
