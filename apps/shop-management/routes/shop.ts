import { Employee, Owner, Shop } from "@prisma/client";
import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify";
import {
  CreateShopOpts,
  QueryShopByOwnerOpts,
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
    Reply:
      | (Shop & { owner: Owner; employees: Employee[] })
      | { message: string };
  }>("/:id", QueryShopOpts, async function (req, reply) {
    const shop = await fastify.prisma.shop.findUnique({
      where: {
        id: req.params.id,
      },

      include: {
        owner: req.query.includeOwner,
        employees: req.query.includeEmployees,
      },
    });

    if (!shop) {
      reply.code(404).send({ message: "Shop not found" });
      return;
    }

    reply.code(200).send(shop);
  });

  fastify.post<{
    Body: Shop;
    Reply: Shop;
  }>("/", CreateShopOpts, async function (req, reply) {
    const shop = await fastify.prisma.shop.create({
      data: req.body,
    });

    reply.code(201).send(shop);
  });

  // get shops by owner id
  fastify.get<{
    Params: TShopQueryParam;
    Querystring: TShopQueryString;
    Reply: Shop[] | { message: string };
  }>("/owner/:id", QueryShopByOwnerOpts, async function (req, reply) {
    const shop = await fastify.prisma.shop.findMany({
      where: {
        ownerId: req.params.id,
      },

      include: {
        owner: req.query.includeOwner,
        employees: req.query.includeEmployees,
      },
    });

    if (!shop) {
      reply.code(404).send({ message: "Shop not found" });
      return;
    }

    reply.code(200).send(shop);
  });

  next();
}

export default shopPlugin;
