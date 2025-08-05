import { TNewShopsDB, eq, shopsDB, sql } from "database-drizzle";
import FastifyTypebox from "../types/fastify.js";
import { TPagableShopQueryString } from "../types/shop.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateShopOpts,
  QueryShopByOwnerOpts,
  QueryShopOpts,
} from "../opts/shop.js";

const ShopRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // get shop by token
  fastify.get("/", QueryShopOpts, async (req, reply) => {
    const shopId = req.userInfo.data.shopId;

    const shop = await fastify.db.query.shopsDB.findFirst({
      where: (shopsDB, { eq }) => eq(shopsDB.id, shopId),
    });

    if (!shop) {
      reply.code(404).send({ message: "Shop not found" });
      return;
    }

    reply.code(200).send(shop);
  });

  // create shop
  fastify.post<{
    Body: TNewShopsDB;
  }>("/create", CreateShopOpts, async (req, reply) => {
    const { insertedId } = (
      await fastify.db
        .insert(shopsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: shopsDB.id })
    )[0];

    const shop = await fastify.db.query.shopsDB.findFirst({
      where: (shopsDB, { eq }) => eq(shopsDB.id, insertedId),
    });

    reply.code(201).send(shop);
  });

  // get paginated shops by owner id
  fastify.get<{
    Querystring: TPagableShopQueryString;
  }>("/owner", QueryShopByOwnerOpts, async (req, reply) => {
    const { limit, page, order, orderBy } = req.query;
    const ownerId = req.userInfo.data.id;

    const offset = page && limit ? page * limit : undefined;

    const shops = await fastify.db.query.shopsDB.findMany({
      where: (shopsDB, { eq }) => eq(shopsDB.ownerId, ownerId),

      limit: limit,
      offset: offset,

      orderBy: (shopsDB, { asc, desc }) => {
        if (orderBy && order === "asc")
          return asc(shopsDB[orderBy as keyof typeof shopsDB]);
        if (orderBy && order === "desc")
          return desc(shopsDB[orderBy as keyof typeof shopsDB]);

        return asc(shopsDB.createdAt);
      },
    });

    const { total } = (
      await fastify.db
        .select({
          total: sql<number>`count(*)`.mapWith(Number).as("total"),
        })
        .from(shopsDB)
        .where(eq(shopsDB.ownerId, ownerId))
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
