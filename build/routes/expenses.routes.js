"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expense_model_js_1 = require("../models/expense.model.js");
const auth_middlewares_js_1 = require("../middlewares/auth.middlewares.js");
const expense_controller_js_1 = require("../controllers/expense.controller.js");
async function expensesRouter(fastify) {
    fastify.withTypeProvider().get("/category", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: expense_model_js_1.getCategorySchema }, expense_controller_js_1.GetCategory);
    fastify.withTypeProvider().get("/expensesId", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: expense_model_js_1.getExpenseSchema }, expense_controller_js_1.ExpenseGet);
    fastify.withTypeProvider().post("/expensecreate", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: expense_model_js_1.expenseCreateSchema }, expense_controller_js_1.CreateExpensePost);
    fastify.withTypeProvider().put("/expenseupdate", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: expense_model_js_1.expenseUpdateSchema }, expense_controller_js_1.UpdateExpensePut);
    fastify.withTypeProvider().delete("/expensedelete/:id", { preHandler: auth_middlewares_js_1.ValidateAuthenticate, schema: expense_model_js_1.expenseDeleteSchema }, expense_controller_js_1.DeleteExpense);
}
;
exports.default = expensesRouter;
