"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersgroups_controller_js_1 = require("../controllers/usersgroups.controller.js");
const auth_middlewares_js_1 = require("../middlewares/auth.middlewares.js");
const usersgroups_model_js_1 = require("../models/usersgroups.model.js");
async function usersGroupsRouter(fastify) {
    fastify.withTypeProvider().get("", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: usersgroups_model_js_1.getUsersGroupsSchema }, usersgroups_controller_js_1.GetUsersGroups);
}
;
exports.default = usersGroupsRouter;
