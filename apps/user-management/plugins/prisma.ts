import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  fastify.decorate("prisma", prisma);
  done();
}

export default FastifyPlugin(swaggerPlugin);
