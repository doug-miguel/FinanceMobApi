import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { BadRequest } from "./bad-request";
import { NoContent } from "./no-content";

type FastifyErrorhandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorhandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation.",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }

  if (error instanceof NoContent) {
    return reply.status(204);
  }

  return reply.status(500).send({ message: "Internal server error!", error });
};
