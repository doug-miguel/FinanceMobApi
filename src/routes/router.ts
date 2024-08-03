import { FastifyInstance } from "fastify";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import expensesRouter from "./expenses.routes.js";
import groupRouter from "./group.routes.js";

async function router(fastify: FastifyInstance) {
  fastify.register(expensesRouter, { prefix: "api/v1/expense" });
  fastify.register(authRouter, { prefix: "api/v1/auth" });
  fastify.register(userRouter, { prefix: "api/v1/user" });
  fastify.register(groupRouter, { prefix: "api/v1/group" });
};

export default router;
