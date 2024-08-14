"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const auth_model_js_1 = require("../models/auth.model.js");
async function authRouter(fastify) {
    fastify.withTypeProvider().post("", { schema: auth_model_js_1.authSchema }, auth_controller_js_1.Auth);
    fastify.withTypeProvider().post('/validatereq', { schema: auth_model_js_1.resetUserSchema }, auth_controller_js_1.ResetReqResUser);
}
;
exports.default = authRouter;
