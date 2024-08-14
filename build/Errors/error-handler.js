"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const bad_request_js_1 = require("./bad-request.js");
const no_content_js_1 = require("./no-content.js");
const unauthorized_js_1 = require("./unauthorized.js");
const errorHandler = (error, request, reply) => {
    if (error instanceof zod_1.ZodError) {
        return reply.status(400).send({
            message: "Error during validation.",
            errors: error.flatten().fieldErrors,
        });
    }
    ;
    if (error instanceof bad_request_js_1.BadRequest) {
        return reply.status(400).send({ message: error.message });
    }
    ;
    if (error instanceof unauthorized_js_1.Unauthorized) {
        return reply.status(401).send({ message: error.message });
    }
    ;
    if (error instanceof no_content_js_1.NoContent) {
        return reply.status(204);
    }
    ;
    return reply.status(500).send({ message: "Internal server error!", error });
};
exports.errorHandler = errorHandler;
