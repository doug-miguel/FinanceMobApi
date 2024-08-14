import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest } from "../Errors/bad-request.js";
import { Params } from "../types/generic.types.js";
import { CreateGroup, UpdateGroup } from "../types/group.types.js";
import { DecodeTokenProps } from "@/types/auth.types.js";

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
            }
        })

        const idUserGroup = await prisma.userGroup.create({
            data: {
                user_id: +id,
                create_user: +id,
                group_id: idGroup.id,
            }
        })

        return res.status(201).send({ idUserGroup: idUserGroup.id });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};

export async function GroupUpdatePut(req: FastifyRequest<UpdateGroup>, res: FastifyReply) {
    try {
        const {
            id,
            description,
            active,
        } = req.body;

        if (!id) {
            return new BadRequest('Id não informado');
        }

        const groupId = await prisma.group.findUnique({
            where: { id }
        });

        if (!groupId) {
            return new BadRequest('Grupo não encontrado');
        }

        const data: Partial<UpdateGroup['Body']> = {};

        if (description) data.description = description;
        if (active === 0) data.active = 0;
        if (active === 1) data.active = 1;

        await prisma.group.update({
            where: { id },
            data,
        });

        return res.status(201).send({ message: 'Grupo atualizado' });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};