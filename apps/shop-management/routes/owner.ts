import { Owner } from "@prisma/client";
import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify";
import { CreateOwnerOpts, TOwnerIn } from "../types/owner";

function ownerPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  fastify.post<{
    Body: TOwnerIn;
    Reply: Owner;
  }>("/", CreateOwnerOpts, async function (req, reply) {
    const hashedPassword = await fastify.hashPassword(req.body.password);

    const userWithHashedPassword = {
      ...req.body,
      password: hashedPassword,
    };

    const user = await fastify.prisma.owner.create({
      data: userWithHashedPassword,
    });

    reply.code(201).send(user);
  });

  next();
}

export default ownerPlugin;
