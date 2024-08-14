"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_js_1 = require("../controllers/user.controller.js");
const auth_middlewares_js_1 = require("../middlewares/auth.middlewares.js");
const user_model_js_1 = require("../models/user.model.js");
async function userRouter(fastify) {
    fastify.withTypeProvider().get("/id/:id", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: user_model_js_1.getUserSchema }, user_controller_js_1.GetUser);
    fastify.withTypeProvider().post("/create", { schema: user_model_js_1.createUserSchema }, user_controller_js_1.CreateUser);
    fastify.withTypeProvider().put("/update", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: user_model_js_1.updateUserSchema }, user_controller_js_1.UpdateUser);
}
;
exports.default = userRouter;
