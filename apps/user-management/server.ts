import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import FastifyHelmet from "@fastify/helmet";
import FastifyCors from "@fastify/cors";
import FastifyRateLimit from "@fastify/rate-limit";
import FastifyAuth from "@fastify/auth";
import FastifyJwt from "@fastify/jwt";

import SwaggerPlugin from "./plugins/swagger.plugin";
import DrizzlePlugin from "./plugins/drizzle.plugin";
import DecoratorPlugin from "./plugins/decorators.plugin";

import FastifyTypebox from "./types/fastify.types";
import HelperRoutes from "./routes/helper.routes";
import OwnerRoutes from "./routes/owner.routes";
import ShopRoutes from "./routes/shop.routes";
import EmployeeRoutes from "./routes/employee.routes";
import AuthRoutes from "./routes/auth.routes";
import EmployeePaymentRoutes from "./routes/employee-payments.routes";

const fastify: FastifyTypebox = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// register helmet
fastify.register(FastifyHelmet);

// register cors
fastify.register(FastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// register rate limit
fastify.register(FastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

// register auth
fastify.register(FastifyAuth);

// register jwt
const secret: string = process.env.JWT_SECRET as string;
fastify.register(FastifyJwt, {
  secret,
});

// ---- register custom plugins ----

// register swagger
fastify.register(SwaggerPlugin);

// register drizzle
fastify.register(DrizzlePlugin);

// register decorators
fastify.register(DecoratorPlugin);

// register unauthenticated routes
fastify.register(HelperRoutes);
fastify.register(AuthRoutes);

// register authenticated routes
fastify.register(OwnerRoutes, { prefix: "/owner" });
fastify.register(ShopRoutes, { prefix: "/shop" });
fastify.register(EmployeeRoutes, { prefix: "/employee" });
fastify.register(EmployeePaymentRoutes, { prefix: "/employee-payments" });

// start the server
fastify.listen({ port: 5000, host: "0.0.0.0" }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.swagger();
});

fastify.setErrorHandler(async (error, request, reply) => {
  console.error(error);
  reply.status(400).send({ error: error.message.split("\n").at(-1) });
});
