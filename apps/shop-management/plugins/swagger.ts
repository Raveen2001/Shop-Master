import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  await fastify.register(FastifySwagger, {
    swagger: {
      info: {
        title: "User Management API",
        description: "This is a fastify API docs for managing users",
        version: "1.0.0",
      },
      host: "http://localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        {
          name: "Owner",
          description: "This has all the endpoints related to owners",
        },
      ],
    },
  });

  await fastify.register(FastifySwaggerUi, {
    routePrefix: "/docs",
  });

  done();
}

export default FastifyPlugin(swaggerPlugin);
