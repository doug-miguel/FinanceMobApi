import { server } from "./src/server.js"
const port = 8080;

const start = async () => {
    try {
        await server.listen({ port: port });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();