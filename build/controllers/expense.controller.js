"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategory = GetCategory;
exports.ExpenseGet = ExpenseGet;
exports.CreateExpensePost = CreateExpensePost;
exports.UpdateExpensePut = UpdateExpensePut;
exports.DeleteExpense = DeleteExpense;
const client_1 = require("@prisma/client");
const bad_request_js_1 = require("../Errors/bad-request.js");
const prisma = new client_1.PrismaClient();
async function GetCategory(req, res) {
    const category = await prisma.expenseCategory.findMany();
    return res.status(200).send({ category: category });
}
;
async function ExpenseGet(req, res) {
    try {
        const { id } = await req.jwtDecode();
        const { category, group_id, idExpense, size, pages } = req.query;
        const whereConditions = {
            ...(group_id ? { group_id: +group_id } : { user_id: id }),
            ...(category ? { category_id: +category } : {}),
            ...(idExpense ? { id: +idExpense } : {}),
        };
        let sizeCounter;
        let pagesCounter;
        if (!size)
            sizeCounter = 20;
        if (size)
            sizeCounter = +size;
        if (!pages)
            pagesCounter = 0;
        if (pages)
            pagesCounter = (+pages - 1) * size;
        const expenses = await prisma.expense.findMany({
            take: sizeCounter,
            skip: pagesCounter,
            where: whereConditions,
            orderBy: {
                id: 'asc'
            }
        });
        return res.status(200).send({ expenses: expenses });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function CreateExpensePost(req, res) {
    try {
        const { title, notes, price, category_id, user_group } = req.body;
        const { id } = await req.jwtDecode();
        const categoryId = await prisma.expenseCategory.findUnique({
            where: { id: category_id }
        });
        if (!categoryId) {
            return new bad_request_js_1.BadRequest('Categoria não encontrada');
        }
        let group_id;
        if (user_group) {
            const user_group_id = await prisma.userGroup.findUnique({
                where: { id: user_group }
            });
            if (!user_group_id) {
                return res.status(400).send({ message: 'Grupo não encontrado' });
            }
            group_id = user_group_id.group_id;
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
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function UpdateExpensePut(req, res) {
    try {
        const { id, category_id, user_group, notes, price, title, } = req.body;
        if (!id) {
            return new bad_request_js_1.BadRequest('Id da despensa não informado');
        }
        const existingExpense = await prisma.expense.findUnique({
            where: { id },
        });
        if (!existingExpense) {
            return new bad_request_js_1.BadRequest('Despensa não encontrada');
        }
        const data = {};
        let group_id_user;
        if (user_group) {
            const user_group_id = await prisma.userGroup.findUnique({
                where: { id: user_group }
            });
            if (!user_group_id) {
                return res.status(400).send({ message: 'Grupo não encontrado' });
            }
            group_id_user = user_group_id.group_id;
        }
        if (category_id)
            data.category_id = category_id;
        if (user_group)
            data.group_id = group_id_user;
        if (notes)
            data.notes = notes;
        if (price)
            data.price = price;
        if (title)
            data.title = title;
        await prisma.expense.update({
            where: { id },
            data,
        });
        return res.status(200).send({ message: 'Despesa atualizada' });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
async function DeleteExpense(req, res) {
    try {
        const id = +req.params.id;
        if (!id) {
            return new bad_request_js_1.BadRequest('Id da despensa não informado');
        }
        const existingExpense = await prisma.expense.findUnique({
            where: { id },
        });
        if (!existingExpense) {
            return new bad_request_js_1.BadRequest('Despensa não encontrada');
        }
        await prisma.expense.delete({
            where: { id },
        });
        return res.status(200).send({ message: 'Despesa deletada' });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
