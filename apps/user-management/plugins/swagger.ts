import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import FastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

const host = process.env["USER_MANAGEMENT_SWAGGER"] as string;
const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "User Management API",
      description: "This is a fastify API docs for managing users",
      version: "1.0.0",
    },
    host: host,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
        name: "Auth",
        description:
          "This has all the endpoints related to user authentication",
      },
      {
        name: "Owner",
        description: "This has all the endpoints related to owners",
      },
      {
        name: "Shop",
        description: "This has all the endpoints related to shops",
      },
      {
        name: "Employee",
        description: "This has all the endpoints related to Employees",
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
