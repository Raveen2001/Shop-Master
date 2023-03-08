import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  fastify.decorate("prisma", prisma);
  done();
}

export default FastifyPlugin(swaggerPlugin);
