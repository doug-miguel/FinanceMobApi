"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_js_1 = __importDefault(require("./auth.routes.js"));
const expenses_routes_js_1 = __importDefault(require("./expenses.routes.js"));
const group_routes_js_1 = __importDefault(require("./group.routes.js"));
const user_routes_js_1 = __importDefault(require("./user.routes.js"));
const usersgroups_routes_js_1 = __importDefault(require("./usersgroups.routes.js"));
async function router(fastify) {
    fastify.register(expenses_routes_js_1.default, { prefix: "api/v1/expense" });
    fastify.register(auth_routes_js_1.default, { prefix: "api/v1/auth" });
    fastify.register(user_routes_js_1.default, { prefix: "api/v1/user" });
    fastify.register(group_routes_js_1.default, { prefix: "api/v1/group" });
    fastify.register(usersgroups_routes_js_1.default, { prefix: "api/v1/usersgroups" });
}
;
exports.default = router;
