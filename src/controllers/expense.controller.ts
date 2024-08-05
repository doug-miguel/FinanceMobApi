import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { ExpenseRequest, ExpenseUpdateRequest } from '../types/expense.types.js';
import { DecodeTokenProps } from '../types/auth.types.js';
import { BadRequest } from '../Errors/bad-request.js';
import { Params } from '../types/generic.types.js';

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
    try {
        const {
            title,
            notes,
            price,
            category_id,
            user_group
        } = req.body;

        const { id }: DecodeTokenProps = await req.jwtDecode();

        const categoryId = await prisma.expenseCategory.findUnique({
            where: { id: category_id }
        })

        if (!categoryId) {
            return new BadRequest('Categoria não encontrada');
        }

        let group_id

        if (user_group) {
            const user_group_id = await prisma.userGroup.findUnique({
                where: { id: user_group }
            });

            if (!user_group_id) {
                return res.status(400).send({ message: 'Grupo não encontrado' });
            }

            group_id = user_group_id.group_id
        }

        const idExpense = await prisma.expense.create({
            data: {
                title,
                notes,
                price,
                category_id,
                user_id: id,
                group_id
            }
        });

        return res.status(201).send({ idExpense: idExpense.id });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
};

export async function UpdateExpensePut(req: FastifyRequest<ExpenseUpdateRequest>, res: FastifyReply) {
    try {
        const {
            id,
            category_id,
            user_group,
            notes,
            price,
            title,
        } = req.body;

        if (!id) {
            return new BadRequest('Id da despensa não informado');
        }


        const existingExpense = await prisma.expense.findUnique({
            where: { id },
        });

        if (!existingExpense) {
            return new BadRequest('Despensa não encontrada');
        }

        const data: Partial<ExpenseUpdateRequest['Body']> = {};

        let group_id_user

        if (user_group) {
            const user_group_id = await prisma.userGroup.findUnique({
                where: { id: user_group }
            });

            if (!user_group_id) {
                return res.status(400).send({ message: 'Grupo não encontrado' });
            }

            group_id_user = user_group_id.group_id
        }

        if (category_id) data.category_id = category_id;
        if (user_group) data.group_id = group_id_user;
        if (notes) data.notes = notes;
        if (price) data.price = price;
        if (title) data.title = title;

        await prisma.expense.update({
            where: { id },
            data,
        });

        return res.status(200).send({ message: 'Despesa atualizada' });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
}

export async function DeleteExpense(req: FastifyRequest<{ Params: Params }>, res: FastifyReply) {
    try {
        const id = +req.params.id;

        if (!id) {
            return new BadRequest('Id da despensa não informado');
        }

        const existingExpense = await prisma.expense.findUnique({
            where: { id },
        });

        if (!existingExpense) {
            return new BadRequest('Despensa não encontrada');
        }

        await prisma.expense.delete({
            where: { id },
        })

        return res.status(200).send({ message: 'Despesa deletada' });
    } catch (error: any) {
        return res.status(error.statusCode).send({ message: error.message });
    };
}
