import { app } from "./server.js";
const port: number = parseInt(process.env.PORT || "8080");

console.log(`Starting server on port ${port}`);

const start = async () => {
  try {
    await app.listen({ port: port });
    console.log(`Server started on port ${port}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
