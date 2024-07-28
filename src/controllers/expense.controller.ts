import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetCategory(req: FastifyRequest, res: FastifyReply) {
    const category = await prisma.expenseCategory.findMany();

    return res.status(200).send({ category: category });
};
