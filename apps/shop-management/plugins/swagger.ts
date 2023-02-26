import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import FastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "User Management API",
      description: "This is a fastify API docs for managing users",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
        name: "Owner",
        description: "This has all the endpoints related to owners",
      },
    ],

    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ apiKey: [] }],
  },
};

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  await fastify.register(FastifySwagger, swaggerOptions);

  await fastify.register(FastifySwaggerUi, {
    routePrefix: "/docs",
  });

  done();
}

export default FastifyPlugin(swaggerPlugin);
