import { Employee, Owner, Shop } from "database";
import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify";
import {
  CreateShopOpts,
  QueryShopByOwnerOpts,
  QueryShopOpts,
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
  }>("/:id", QueryShopOpts, async (req, reply) => {
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
    Querystring: TShopQueryString;
    Body: Shop;
    Reply: Shop & { owner: Owner; employees: Employee[] };
  }>("/", CreateShopOpts, async (req, reply) => {
    const { includeOwner, includeEmployees } = req.query;
    const shop = await fastify.prisma.shop.create({
      data: req.body,
      include: {
        owner: includeOwner,
        employees: includeEmployees,
      },
    });

    reply.code(201).send(shop);
  });

  // get shops by owner id
  fastify.get<{
    Params: TShopQueryParam;
    Querystring: TShopQueryString;
    Reply:
      | (Shop & { owner: Owner; employees: Employee[] })[]
      | { message: string };
  }>("/owner/:id", QueryShopByOwnerOpts, async (req, reply) => {
    const { includeOwner, includeEmployees } = req.query;
    const shops = await fastify.prisma.shop.findMany({
      where: {
        ownerId: req.params.id,
      },

      include: {
        owner: includeOwner,
        employees: includeEmployees,
      },
    });

    if (shops.length === 0) {
      reply.code(404).send({ message: "Shop not found" });
      return;
    }

    reply.code(200).send(shops);
  });

  next();
}

export default shopPlugin;
