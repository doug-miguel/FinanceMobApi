"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = GetUser;
exports.CreateUser = CreateUser;
exports.UpdateUser = UpdateUser;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bad_request_js_1 = require("../Errors/bad-request.js");
const prisma = new client_1.PrismaClient();
async function GetUser(req, res) {
    try {
        const idParams = +req.params.id;
        const { id } = await req.jwtDecode();
        if (idParams !== id) {
            return new bad_request_js_1.BadRequest("Usúario diferente das informações do token!");
        }
        ;
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        const { password, ...userWithoutPassword } = existingUser;
        return res.status(200).send(userWithoutPassword);
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function CreateUser(req, res) {
    try {
        const { full_name, username, email, phone, birthday, password, security_question, security_response, } = req.body;
        const existsUserEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existsUserEmail !== null) {
            return new bad_request_js_1.BadRequest("Já existe um usuário com este e-mail!");
        }
        ;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                full_name,
                email,
                username,
                phone,
                birthday,
                password: hashedPassword,
                security_question,
                security_response,
            },
        });
        return res.status(201).send({ userId: user.id });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function UpdateUser(req, res) {
    try {
        const { full_name, username, email, phone, birthday, password, security_question, security_response, } = req.body;
        const { id } = await req.jwtDecode();
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            return new bad_request_js_1.BadRequest('Usuário não encontrado');
        }
        if (email && email !== existingUser.email) {
            const userWithEmail = await prisma.user.findUnique({
                where: { email },
            });
            if (userWithEmail) {
                return new bad_request_js_1.BadRequest('Já existe um usuário com este e-mail');
            }
        }
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt_1.default.hash(password, 10);
        }
        ;
        const data = {};
        if (full_name)
            data.full_name = full_name;
        if (username)
            data.username = username;
        if (email)
            data.email = email;
        if (phone)
            data.phone = phone;
        if (birthday)
            data.birthday = birthday;
        if (password)
            data.password = hashedPassword;
        if (security_question)
            data.security_question = security_question;
        if (security_response)
            data.security_response = security_response;
        await prisma.user.update({
            where: { id },
            data,
        });
        return res.status(200).send({ message: 'Usuário atualizado' });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
