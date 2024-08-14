import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { DecodeTokenProps } from "../types/auth.types.js";
import { Params } from "@/types/generic.types.js";

const prisma = new PrismaClient();

export async function GetUsersGroups(req: FastifyRequest<{ Params: Params }>, res: FastifyReply) {
    try {
        const id_group = +req.params.id;
        const { id }: DecodeTokenProps = await req.jwtDecode();
        const whereConditions = {
            ...(id_group ? { id: id_group } : { id: id }),
        }

        const usesrGroups = await prisma.userGroup.findMany({
            where: whereConditions
        })

        return res.status(200).send(usesrGroups);
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
}