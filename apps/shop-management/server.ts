import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import FastifyHelmet from "@fastify/helmet";
import FastifyCors from "@fastify/cors";
import FastifyRateLimit from "@fastify/rate-limit";
import FastifyAuth from "@fastify/auth";
import FastifyJwt from "@fastify/jwt";

import FastifyTypebox from "./types/fastify";

import SwaggerPlugin from "./plugins/swagger";
import PrismaPlugin from "./plugins/prisma";
import AuthPlugin from "./plugins/auth";

import OwnerPlugin from "./routes/owner";
import ShopPlugin from "./routes/shop";
import EmployeePlugin from "./routes/employee";

const fastify: FastifyTypebox = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// register rate limit
fastify.register(FastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

// register helmet
fastify.register(FastifyHelmet);

// register cors
fastify.register(FastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// register swagger
fastify.register(SwaggerPlugin);

// register prisma
fastify.register(PrismaPlugin);

// register jwt
fastify.register(FastifyJwt, {
  secret: "secret",
});

// register auth
fastify.register(AuthPlugin);
fastify.register(FastifyAuth);

// health check endpoint
fastify.get("/ping", async (request, reply) => {
  return "pong";
});

// register routes
fastify.register(OwnerPlugin, { prefix: "/owner" });
fastify.register(ShopPlugin, { prefix: "/shop" });
fastify.register(EmployeePlugin, { prefix: "/employee" });

// start the server
fastify.listen({ port: 3000 }, async (err, adddress) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

fastify.setErrorHandler(async (error, request, reply) => {
  console.error(error);
  reply.status(400).send({ error: error.message.split("\n").at(-1) });
});

fastify.addHook("onClose", async (instance, done) => {
  console.log("closing prisma connection");
  await instance.prisma.$disconnect();
  done();
});
