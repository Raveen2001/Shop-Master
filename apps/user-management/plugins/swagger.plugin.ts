import fp from "fastify-plugin";
import FastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "User Management API",
      description: "This is a fastify API docs for managing users",
      version: "1.0.0",
    },
    host: "127.0.0.1:5000",
    schemes: ["http"],
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
      {
        name: "Employee-Payments",
        description: "This has all the endpoints related to Employee-Payments",
      },

      {
        name: "Customer",
        description: "This has all the endpoints related to Customers",
      },

      {
        name: "Customer-Payments",
        description: "This has all the endpoints related to Customer-Payments",
      },

      {
        name: "Brand",
        description: "This has all the endpoints related to Brands",
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

const swaggerPlugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.register(FastifySwagger, swaggerOptions);

  fastify.register(FastifySwaggerUi, {
    routePrefix: "/docs",
  });
};

export default fp(swaggerPlugin);
