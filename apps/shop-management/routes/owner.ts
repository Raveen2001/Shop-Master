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
    Reply: TOwnerOut;
  }>("/", CreateOwnerOpts, (req, reply) => {});
  next();
}

export default ownerPlugin;
