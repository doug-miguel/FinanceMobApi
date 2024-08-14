"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middlewares_js_1 = require("../middlewares/auth.middlewares.js");
const group_model_js_1 = require("../models/group.model.js");
const group_controller_js_1 = require("../controllers/group.controller.js");
async function groupRouter(fastify) {
    fastify.withTypeProvider().get("/groupId/:id", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: group_model_js_1.getGroupSchema }, group_controller_js_1.GroupByIdGet);
    fastify.withTypeProvider().post("/creategroup", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: group_model_js_1.createGroupSchema }, group_controller_js_1.GroupCreatePost);
    fastify.withTypeProvider().put("/updategroup", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: group_model_js_1.updateGroupSchema }, group_controller_js_1.GroupUpdatePut);
}
exports.default = groupRouter;
