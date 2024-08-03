import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { Params } from "../types/generic.types.js";
import { BadRequest } from "../Errors/bad-request.js";
import { CreateGroup } from "../types/group.types.js";
import { DecodeTokenProps } from "../types/auth.types.js";

const prisma = new PrismaClient();

export async function GroupByIdGet(req: FastifyRequest<{ Params: Params }>, res: FastifyReply) {
    try {
        const id = +req.params.id;

        if (!id) {
            return new BadRequest('Id do grupo não informado');
        }

        const group = await prisma.group.findUnique({
            where: { id },
        });

        if (!group) {
            return new BadRequest('Grupo não encontrada');
        }

        if (!group.active) {
            return new BadRequest('Grupo intativo');
        }

        return res.status(200).send(group);
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};

export async function GroupCreatePost(req: FastifyRequest<CreateGroup>, res: FastifyReply) {
    try {
        const {
            description,
            active,
        } = req.body;

        const { id }: DecodeTokenProps = await req.jwtDecode();

        const idGroup = await prisma.group.create({
            data: {
                description,
                active,
                createUser: id
            }
        })
        return res.status(201).send({ idGroup: idGroup.id });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};