"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupByIdGet = GroupByIdGet;
exports.GroupCreatePost = GroupCreatePost;
exports.GroupUpdatePut = GroupUpdatePut;
const client_1 = require("@prisma/client");
const bad_request_js_1 = require("../Errors/bad-request.js");
const prisma = new client_1.PrismaClient();
async function GroupByIdGet(req, res) {
    try {
        const id = +req.params.id;
        if (!id) {
            return new bad_request_js_1.BadRequest('Id do grupo não informado');
        }
        const group = await prisma.group.findUnique({
            where: { id },
        });
        if (!group) {
            return new bad_request_js_1.BadRequest('Grupo não encontrada');
        }
        if (!group.active) {
            return new bad_request_js_1.BadRequest('Grupo intativo');
        }
        return res.status(200).send(group);
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function GroupCreatePost(req, res) {
    try {
        const { description, active, } = req.body;
        const idGroup = await prisma.group.create({
            data: {
                description,
                active,
            }
        });
        return res.status(201).send({ idGroup: idGroup.id });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function GroupUpdatePut(req, res) {
    try {
        const { id, description, active, } = req.body;
        if (!id) {
            return new bad_request_js_1.BadRequest('Id não informado');
        }
        const groupId = await prisma.group.findUnique({
            where: { id }
        });
        if (!groupId) {
            return new bad_request_js_1.BadRequest('Grupo não encontrada');
        }
        const data = {};
        if (description)
            data.description = description;
        if (active === 0)
            data.active = 0;
        if (active === 1)
            data.active = 1;
        await prisma.group.update({
            where: { id },
            data,
        });
        return res.status(201).send({ message: 'Grupo atualizado' });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
