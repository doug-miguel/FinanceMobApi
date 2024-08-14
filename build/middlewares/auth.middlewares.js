"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateAuthenticate = void 0;
const unauthorized_js_1 = require("../Errors/unauthorized.js");
const ValidateAuthenticate = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer /i, '');
        if (!token) {
            return new unauthorized_js_1.Unauthorized('Não autorizado - Token não encontrado.');
        }
        ;
        const decodedToken = await req.jwtVerify();
        if (!decodedToken) {
            return new unauthorized_js_1.Unauthorized('Não autorizado - Token inválido.');
        }
        ;
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).send({ message: error.message });
    }
    ;
};
exports.ValidateAuthenticate = ValidateAuthenticate;
