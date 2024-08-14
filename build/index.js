"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("./server.js");
const port = parseInt(process.env.PORT || "8080");
const start = async () => {
    try {
        await server_js_1.app.listen({ port: port });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
