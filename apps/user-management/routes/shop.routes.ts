import { Shop, eq, shopsDB, sql } from "database-drizzle";
import FastifyTypebox from "../types/fastify.types";
import {
  TPagableShopQueryString,
  TShopQueryParam,
  TShopQueryString,
} from "../types/shop.types";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateShopOpts,
  QueryShopByOwnerOpts,
  QueryShopOpts,
} from "../opts/shops.opts";

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

  // create shop
  fastify.post<{
    Querystring: TShopQueryString;
    Body: Shop;
  }>("/create", CreateShopOpts, async (req, reply) => {
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
    Querystring: TPagableShopQueryString;
  }>("/owner/:id", QueryShopByOwnerOpts, async (req, reply) => {
    const { includeOwner, includeEmployees, limit, page, order, orderBy } =
      req.query;

    const offset = page && limit ? page * limit : undefined;

    const shops = await fastify.db.query.shopsDB.findMany({
      where: (shopsDB, { eq }) => eq(shopsDB.ownerId, req.params.id),

      with: {
        owner: includeOwner || undefined,
        employees: includeEmployees || undefined,
      },

      limit: limit,
      offset: offset,

      orderBy: (shopsDB, { asc, desc }) => {
        if (orderBy && order === "asc") return asc(shopsDB[orderBy]);
        if (orderBy && order === "desc") return desc(shopsDB[orderBy]);

        return asc(shopsDB.createdAt);
      },
    });

    const { total } = (
      await fastify.db
        .select({
          total: sql<number>`count(*)`.mapWith(Number).as("total"),
        })
        .from(shopsDB)
        .where(eq(shopsDB.ownerId, req.params.id))
    )[0];

    reply.code(200).send({
      rows: shops,
      total,
      page,
      limit,
    });
  });
};

export default ShopRoutes;
