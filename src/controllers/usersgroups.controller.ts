import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { DecodeTokenProps } from "../types/auth.types.js";

const prisma = new PrismaClient();

export async function GetUsersGroups(req: FastifyRequest, res: FastifyReply) {
    try {
        const { id }: DecodeTokenProps = await req.jwtDecode();

        const usesrGroups = await prisma.userGroup.findMany({
            where: { user_id: id }
        })

        return res.status(200).send(usesrGroups);
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
}