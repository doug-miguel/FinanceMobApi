import { GetInvitation, RespondInvitationPost, SendInvitationPost } from "../controllers/invitation.controller.js";
import { invitationCreateSchema, invitationGetSchema, invitationResponseSchema } from "../models/invitation.model.js";
import { HandleInvitation, SendInvitation } from "@/types/invitation.types.js";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ValidateAuthenticate } from "../middlewares/auth.middlewares.js";
import { Params } from "../types/generic.types.js";

async function invitationRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().get<{ Params: Params }>("/:id",
        { preHandler: ValidateAuthenticate, schema: invitationGetSchema }, GetInvitation);

    fastify.withTypeProvider<ZodTypeProvider>().post<SendInvitation>("/sendinvitation",
        { preHandler: ValidateAuthenticate, schema: invitationCreateSchema }, SendInvitationPost);

    fastify.withTypeProvider<ZodTypeProvider>().post<HandleInvitation>("/handleinvitation",
        { preHandler: ValidateAuthenticate, schema: invitationResponseSchema }, RespondInvitationPost);
}

export default invitationRouter;