import { app } from "./server.js";
const port: number = parseInt(process.env.PORT || "8080");

console.log(`Starting server on port ${port}`);

const start = async () => {
  try {
    await app.listen({ port: port });
  } catch (err) {
    process.exit(1);
  }
};

start();
