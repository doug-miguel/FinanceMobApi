import { FastifyInstance } from "fastify";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import expensesRouter from "./expenses.routes.js";

async function router(fastify: FastifyInstance) {
  fastify.register(expensesRouter, { prefix: "api/v1/expense" });
  fastify.register(authRouter, { prefix: "api/v1/auth" });
  fastify.register(userRouter, { prefix: "api/v1/user" });
};

export default router;
