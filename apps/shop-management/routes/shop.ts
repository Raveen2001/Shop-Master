import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify";

function shopPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  fastify.get("/", (req, reply) => {
    reply.send("hello");
  });

  fastify.post("/", (req, reply) => {
    reply.send("hello");
  });
  next();
}

export default shopPlugin;
