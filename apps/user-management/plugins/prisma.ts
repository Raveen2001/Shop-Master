import FastifyPlugin from "fastify-plugin";
import { PrismaClient } from "database";
import FastifyTypebox from "../types/fastify";

const prisma = new PrismaClient();

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  fastify.decorate("prisma", prisma);
  done();
}

export default FastifyPlugin(swaggerPlugin);
