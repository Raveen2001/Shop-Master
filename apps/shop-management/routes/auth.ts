import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify.type";

function authPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  fastify.get("/", (req, reply) => {
    reply.send("hello");
  });
  next();
}

export default authPlugin;
