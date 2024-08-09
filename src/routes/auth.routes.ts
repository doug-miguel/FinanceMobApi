import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { Auth, ResetReqResUser } from '../controllers/auth.controller.js';
import { authSchema, resetUserSchema } from '../models/auth.model.js';
import { ResetRequest } from '../types/auth.types.js';

async function authRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().post("", { schema: authSchema }, Auth);

    fastify.withTypeProvider<ZodTypeProvider>().post<ResetRequest>('/validatereq',
        { schema: resetUserSchema }, ResetReqResUser);
};

export default authRouter;