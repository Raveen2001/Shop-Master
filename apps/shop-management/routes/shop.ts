import { Shop } from "@prisma/client";
import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify";
import {
  CreateShopOpts,
  QueryShopOpts,
  TShopIn,
  TShopQueryParam,
  TShopQueryString,
} from "../types/shop";

function shopPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  // get shop by id
  fastify.get<{
    Params: TShopQueryParam;
    Querystring: TShopQueryString;
  }>("/:id", QueryShopOpts, async function (req, reply) {
    const shop = await fastify.prisma.shop.findUnique({
      where: {
        id: req.params.id,
      },

      include: {
        Owner: req.query.includeOwner,
        Employee: req.query.includeEmployee,
      },
    });

    if (!shop) {
      reply.code(404).send({ message: "Shop not found" });
      return;
    }

    reply.code(200).send(shop);
  });

  fastify.post<{
    Body: TShopIn;
    Reply: Shop;
  }>("/", CreateShopOpts, async function (req, reply) {
    const shop = await fastify.prisma.shop.create({
      data: req.body,
    });

    reply.code(201).send(shop);
  });
  next();
}

export default shopPlugin;
