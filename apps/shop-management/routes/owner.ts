import { FastifyPluginOptions } from "fastify";
import { request } from "http";
import FastifyTypebox from "../types/fastify";
import { CreateOwnerOpts, TOwner, TOwnerIn, TOwnerOut } from "../types/owner";

function ownerPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  fastify.post<{
    Body: TOwnerIn;
    // Reply: TOwnerOut;
  }>("/", CreateOwnerOpts, (req, reply) => {
    reply.status(201).send(req.body);
  });
  next();
}

export default ownerPlugin;
