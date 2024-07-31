import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { ExpenseRequest } from '../types/expense.types.js';
import { DecodeTokenProps } from '../types/auth.types.js';
import { Params } from '../types/generic.js';

const prisma = new PrismaClient();

export async function GetCategory(req: FastifyRequest, res: FastifyReply) {
    const category = await prisma.expenseCategory.findMany();
    return res.status(200).send({ category: category });
};

export async function ExpenseGet(req: FastifyRequest, res: FastifyReply) {
    try {
        const { id }: DecodeTokenProps = await req.jwtDecode();
        const { category, group_id, idExpense, size, pages }: any = req.query;
        const whereConditions = {
            ...(group_id ? { group_id: +group_id } : { user_id: id }),
            ...(category ? { category_id: +category } : {}),
            ...(idExpense ? { id: +idExpense } : {}),
        }

        let sizeCounter;
        let pagesCounter;

        if (!size) sizeCounter = 20;
        if (size) sizeCounter = +size;

        if (!pages) pagesCounter = 0;
        if (pages) pagesCounter = (+pages - 1) * size;

        const expenses = await prisma.expense.findMany({
            take: sizeCounter,
            skip: pagesCounter,
            where: whereConditions,
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).send({ expenses: expenses });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
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
