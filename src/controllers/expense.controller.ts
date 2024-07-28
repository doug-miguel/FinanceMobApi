import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { ExpenseRequest } from '../types/expense.types.js';
import { DecodeTokenProps } from '../types/auth.types.js';

const prisma = new PrismaClient();

export async function GetCategory(req: FastifyRequest, res: FastifyReply) {
    const category = await prisma.expenseCategory.findMany();
    return res.status(200).send({ category: category });
};

export async function CreateExpensePost(req: FastifyRequest<ExpenseRequest>, res: FastifyReply) {
    const {
        title,
        notes,
        price,
        category_id,
        group_id
    } = req.body;

    const { id }: DecodeTokenProps = await req.jwtDecode();
    const expense = await prisma.expense.create({
        data: {
            title,
            notes,
            price,
            category_id,
            user_id: id,
            group_id
        }
    });

    return res.status(201).send({ idExpense: expense.id });
};
