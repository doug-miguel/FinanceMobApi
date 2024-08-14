"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
exports.ResetReqResUser = ResetReqResUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_js_1 = require("../lib/prisma.js");
const bad_request_js_1 = require("../Errors/bad-request.js");
async function Auth(req, res) {
    try {
        const { email, password } = req.body;
        const existsUserEmail = await prisma_js_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!existsUserEmail)
            return new bad_request_js_1.BadRequest("Usúario não encontrado");
        const comparePassword = await bcrypt_1.default.compare(password, existsUserEmail.password);
        if (!comparePassword)
            return new bad_request_js_1.BadRequest("Senha incorreta");
        const payload = {
            id: existsUserEmail.id,
            name: existsUserEmail.full_name,
            email: existsUserEmail.email,
            username: existsUserEmail.username
        };
        const token = await res.jwtSign(payload, { expiresIn: '2h' });
        return res.status(200).send({ token });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
async function ResetReqResUser(req, res) {
    try {
        const { email, security_question, security_response, } = req.body;
        const existingUser = await prisma_js_1.prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            return new bad_request_js_1.BadRequest('Usuário não encontrado');
        }
        ;
        if (existingUser.security_question !== security_question) {
            return new bad_request_js_1.BadRequest('Pergunta informada incorreta');
        }
        ;
        if (existingUser.security_response !== security_response) {
            return new bad_request_js_1.BadRequest('Resposta informada incorreta');
        }
        ;
        const payload = {
            id: existingUser.id,
            name: existingUser.full_name,
            email: existingUser.email,
            username: existingUser.username
        };
        const token = await res.jwtSign(payload, { expiresIn: '2h' });
        return res.status(200).send({ token });
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
;
