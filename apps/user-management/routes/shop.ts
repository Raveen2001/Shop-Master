import { Shop, shopsDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  CreateShopOpts,
  QueryShopByOwnerOpts,
  QueryShopOpts,
  TShopQueryParam,
  TShopQueryString,
} from "../types/shop";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const ShopRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // get shop by id
  fastify.get<{
    Params: TShopQueryParam;
    Querystring: TShopQueryString;
  }>("/:id", QueryShopOpts, async (req, reply) => {
    const shop = await fastify.db.query.shopsDB.findFirst({
      where: (shopsDB, { eq }) => eq(shopsDB.id, req.params.id),

      with: {
        owner: req.query.includeOwner || undefined,
        employees: req.query.includeEmployees || undefined,
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
  }>("/", CreateShopOpts, async (req, reply) => {
    const { includeOwner, includeEmployees } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(shopsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: shopsDB.id })
    )[0];

    const shop = await fastify.db.query.shopsDB.findFirst({
      where: (shopsDB, { eq }) => eq(shopsDB.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        employees: includeEmployees || undefined,
      },
    });

    reply.code(201).send(shop);
  });

  // get shops by owner id
  fastify.get<{
    Params: TShopQueryParam;
    Querystring: TShopQueryString;
  }>("/owner/:id", QueryShopByOwnerOpts, async (req, reply) => {
    const { includeOwner, includeEmployees } = req.query;
    const shops = await fastify.db.query.shopsDB.findMany({
      where: (shopsDB, { eq }) => eq(shopsDB.ownerId, req.params.id),

      with: {
        owner: includeOwner || undefined,
        employees: includeEmployees || undefined,
      },
    });

    reply.code(200).send(shops);
  });
};

export default ShopRoutes;
