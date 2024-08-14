import { app } from "./server.js";
const port: number = parseInt(process.env.PORT || "8080");

const start = async () => {
  try {
    await app.listen({ port: port });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
