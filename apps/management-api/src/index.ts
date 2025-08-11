import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import FastifyHelmet from "@fastify/helmet";
import FastifyCors from "@fastify/cors";
import FastifyRateLimit from "@fastify/rate-limit";
import FastifyAuth from "@fastify/auth";
import FastifyJwt from "@fastify/jwt";
import FastifyMultipart from "@fastify/multipart";

import SwaggerPlugin from "./plugins/swagger.plugin.js";
import DrizzlePlugin from "./plugins/drizzle.plugin.js";
import DecoratorPlugin from "./plugins/decorators.plugin.js";

import FastifyTypebox from "./types/fastify.js";

import HelperRoutes from "./routes/helper.js";

import AuthRoutes from "./routes/auth.js";

import OwnerRoutes from "./routes/owner.js";
import ShopRoutes from "./routes/shop.js";

import EmployeeRoutes from "./routes/employee.js";
import EmployeePaymentRoutes from "./routes/employee-payments.js";

import CustomerRoutes from "./routes/customer.js";
import CustomerPaymentRoutes from "./routes/customer-payments.js";

import CategoryRoutes from "./routes/category.js";
import ProductVariantRoutes from "./routes/product-variant.js";
import ProductRoutes from "./routes/product.js";

import OrderRoutes from "./routes/order.js";
import OrderItemRoutes from "./routes/order-item.js";
import UploadRoutes from "./routes/upload.js";
import fastifyStatic from "@fastify/static";
import path from "path";

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

// register multipart for file uploads
fastify.register(FastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Only allow 1 file per request
  },
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

fastify.register(CategoryRoutes, { prefix: "/categories" });
fastify.register(ProductRoutes, { prefix: "/products" });
fastify.register(ProductVariantRoutes, { prefix: "/product-variants" });

fastify.register(OrderRoutes, { prefix: "/orders" });
fastify.register(OrderItemRoutes, { prefix: "/order-items" });

fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), "uploads"),
  prefix: "/uploads/",
  setHeaders: (res) => {
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  },
});

fastify.register(UploadRoutes, { prefix: "/upload" });

// start the server
fastify.listen(
  {
    port: Number(process.env.MANAGEMENT_API_PORT ?? 9000),
    host: "0.0.0.0", // Listen on all network interfaces
  },
  async (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    fastify.swagger();
  }
);

fastify.setErrorHandler(async (error, request, reply) => {
  console.error(error);
  reply.status(400).send({ error: error.message.split("\n").at(-1) });
});
