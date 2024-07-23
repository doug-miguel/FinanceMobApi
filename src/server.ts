import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { errorHandler } from "./Errors/error-handler.js";
import router from "./routes/router.js";

export const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(fjwt, { secret: process.env.SECRET || '' });

app.register(fCookie, {
  secret: process.env.SECRET || '',
  hook: 'preHandler',
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "FinanceMobApi",
      description:
        "Especificações de cada rota da api de gerenciamento financeiro da FinanceMobApi",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/swagger",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(router);
app.setErrorHandler(errorHandler);
