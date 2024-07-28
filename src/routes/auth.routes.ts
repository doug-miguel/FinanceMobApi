import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { Auth } from '../controllers/auth.controller.js';
import { authSchema } from '../models/auth.model.js';

async function authRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().post("", { schema: authSchema }, Auth);
}

export default authRouter;