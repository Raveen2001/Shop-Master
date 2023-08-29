import fp from "fastify-plugin";
import db from "database-drizzle";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const drizzlePlugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.decorate("db", db);
};

export default fp(drizzlePlugin);
