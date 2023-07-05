import FastifyPlugin from "fastify-plugin";
import db from "database-drizzle";
import FastifyTypebox from "../types/fastify";

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  fastify.decorate("db", db);
  done();
}

export default FastifyPlugin(swaggerPlugin);
