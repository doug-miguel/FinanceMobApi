import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest } from "../Errors/bad-request.js";
import { DecodeTokenProps } from "@/types/auth.types.js";
import { HandleInvitation, SendInvitation } from "../types/invitation.types.js";

const prisma = new PrismaClient();

export async function GetInvitation(req: FastifyRequest, res: FastifyReply) {
    try {
        const { id }: DecodeTokenProps = await req.jwtDecode();

        const invitation = await prisma.invitation.findMany({
            where: {
                id_user: Number(id)
            }
        });

        if (!invitation) {
            return new BadRequest('Convite não encontrado.');
        }

        const filteredInvitations = invitation.map(({ created_at, updated_at, id, invited_by, ...rest }) => rest);

        return res.status(200).send(filteredInvitations);
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    }
}

export async function SendInvitationPost(req: FastifyRequest<SendInvitation>, res: FastifyReply) {
    try {
        const { email, group_id } = req.body;
        const { id }: DecodeTokenProps = await req.jwtDecode();

        const group = await prisma.group.findUnique({
            where: { id: group_id },
        });

        if (!group) {
            return new BadRequest('Grupo não encontrado.');
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new BadRequest('Usuário não encontrado.');
        }

        const userGroup = await prisma.userGroup.findFirst({
            where: {
                user_id: user.id,
                group_id: group_id,
            },
        });

        if (userGroup) {
            return new BadRequest('Usuário já está no grupo.');
        }

        const existingInvitation = await prisma.invitation.findFirst({
            where: {
                id_user: user.id,
                group_id,
                status: 'pending',
            }
        });

        if (existingInvitation) {
            return new BadRequest('Convite já foi enviado.');
        }

        const createGroupUser = await prisma.userGroup.findFirst({
            where: {
                group_id: group_id,
            }
        });

        if (createGroupUser?.create_user !== id) {
            return new BadRequest('Apenas o criado do grupo pode adicionar membros.');
        }

        const invitation = await prisma.invitation.create({
            data: {
                id_user: user.id,
                group_id,
                invited_by: id,
            },
        });

        return res.status(201).send({ invitationId: invitation.id });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    }
}

export async function RespondInvitationPost(req: FastifyRequest<HandleInvitation>, res: FastifyReply) {
    try {
        const { id } = req.body;
        const { action } = req.body;
        const { id: userId }: DecodeTokenProps = await req.jwtDecode();

        if (!id) {
            return new BadRequest('Id do convite não informado');
        }

        const invitation = await prisma.invitation.findUnique({
            where: { id },
        });


        if (!invitation || invitation.status !== 'pending') {
            return new BadRequest('Convite inválido ou já processado.');
        }

        const group = await prisma.group.findUnique({
            where: { id: invitation.group_id },
        });

        if (!group) {
            return new BadRequest('Grupo não encontrado.');
        }

        if (action === 'accept') {
            await prisma.userGroup.create({
                data: {
                    user_id: userId,
                    group_id: invitation.group_id,
                    create_user: invitation.invited_by,
                },
            });

            await prisma.invitation.update({
                where: { id: invitation.id },
                data: { status: 'accepted' },
            });

            return res.status(200).send({ message: 'Convite aceito com sucesso!' });
        } else if (action === 'decline') {
            await prisma.invitation.update({
                where: { id: invitation.id },
                data: { status: 'declined' },
            });

            return res.status(200).send({ message: 'Convite recusado com sucesso!' });
        } else {
            return new BadRequest('Ação inválida.');
        }
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    }
}
