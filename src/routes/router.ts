import { FastifyInstance } from "fastify";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

async function router(fastify: FastifyInstance) {
  fastify.register(authRouter, { prefix: "api/v1/auth" });
  fastify.register(userRouter, { prefix: "api/v1/user" });
}

export default router;
