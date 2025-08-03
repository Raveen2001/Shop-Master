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

import FastifyTypebox from "./types/fastify";

import HelperRoutes from "./routes/helper";

import AuthRoutes from "./routes/auth";

import OwnerRoutes from "./routes/owner";
import ShopRoutes from "./routes/shop";

import EmployeeRoutes from "./routes/employee";
import EmployeePaymentRoutes from "./routes/employee-payments";

import CustomerRoutes from "./routes/customer";
import CustomerPaymentRoutes from "./routes/customer-payments";

import BrandRoutes from "./routes/brand";
import CategoryRoutes from "./routes/category";
import SubCategoryRoutes from "./routes/sub-category";
import ProductVariantRoutes from "./routes/product-variant";
import ProductRoutes from "./routes/product";

import OrderRoutes from "./routes/order";
import OrderItemRoutes from "./routes/order-item";

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

// ---- register routes ----

// register unauthenticated routes
fastify.register(HelperRoutes);
fastify.register(AuthRoutes);

// register authenticated routes
fastify.register(OwnerRoutes, { prefix: "/owners" });
fastify.register(ShopRoutes, { prefix: "/shops" });

fastify.register(EmployeeRoutes, { prefix: "/employees" });
fastify.register(EmployeePaymentRoutes, { prefix: "/employee-payments" });

fastify.register(CustomerRoutes, { prefix: "/customers" });
fastify.register(CustomerPaymentRoutes, { prefix: "/customer-payments" });

fastify.register(BrandRoutes, { prefix: "/brands" });
fastify.register(CategoryRoutes, { prefix: "/categories" });
fastify.register(SubCategoryRoutes, { prefix: "/sub-categories" });
fastify.register(ProductRoutes, { prefix: "/products" });
fastify.register(ProductVariantRoutes, { prefix: "/product-variants" });

fastify.register(OrderRoutes, { prefix: "/orders" });
fastify.register(OrderItemRoutes, { prefix: "/order-items" });

// start the server
fastify.listen({ port: 9000, host: "0.0.0.0" }, async (err) => {
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
