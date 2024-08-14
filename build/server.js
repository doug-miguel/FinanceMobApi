"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_1 = __importDefault(require("@fastify/cookie"));
const cors_1 = require("@fastify/cors");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const fastify_1 = require("fastify");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = require("@fastify/swagger-ui");
const error_handler_js_1 = require("./Errors/error-handler.js");
const router_js_1 = __importDefault(require("./routes/router.js"));
exports.app = (0, fastify_1.fastify)({
    logger: true,
}).withTypeProvider();
exports.app.register(jwt_1.default, { secret: process.env.SECRET || "" });
exports.app.register(cookie_1.default, {
    secret: process.env.SECRET || "",
    hook: "preHandler",
});
exports.app.register(cors_1.fastifyCors, {
    origin: "*",
});
exports.app.register(swagger_1.fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
            title: "FinanceMobApi",
            description: "Especificações de cada rota da api de gerenciamento financeiro da FinanceMobApi",
            version: "1.0.0",
        },
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                description: "JWT Authorization header using the Bearer scheme.",
            },
        },
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
exports.app.addHook("onRequest", (request, reply, done) => {
    if (request.headers.authorization &&
        !request.headers.authorization.startsWith("Bearer ")) {
        request.headers.authorization = `Bearer ${request.headers.authorization}`;
    }
    done();
});
exports.app.register(swagger_ui_1.fastifySwaggerUi, {
    routePrefix: "/swagger",
});
exports.app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
exports.app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
exports.app.register(router_js_1.default);
exports.app.setErrorHandler(error_handler_js_1.errorHandler);
