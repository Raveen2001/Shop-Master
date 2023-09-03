import { TNewBrandsDB, brandsDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  TBrandQueryByFields,
  TBrandQueryParam,
  TBrandQueryString,
} from "../types/brand";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateBrandOpts,
  QueryBrandByOwnerOpts,
  QueryBrandOpts,
} from "../opts/brand";
import { RouteHandlerMethod } from "fastify";

const BrandRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // get brand by id
  fastify.get<{
    Params: TBrandQueryParam;
    Querystring: TBrandQueryString;
  }>("/:id", QueryBrandOpts, async (req, reply) => {
    const { includeOwner, includeProducts, includeShop } = req.query;

    const brand = await fastify.db.query.brandsDB.findFirst({
      where: (brandsDB, { eq }) => eq(brandsDB.id, req.params.id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        products: includeProducts || undefined,
      },
    });

    if (!brand) {
      reply.code(404).send({ message: "Brand not found" });
      return;
    }

    reply.code(200).send(brand);
  });

  // create brand
  fastify.post<{
    Querystring: TBrandQueryString;
    Body: TNewBrandsDB;
  }>("/create", CreateBrandOpts, async (req, reply) => {
    const { includeOwner, includeProducts, includeShop } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(brandsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: brandsDB.id })
    )[0];

    const brand = await fastify.db.query.brandsDB.findFirst({
      where: (brandsDB, { eq }) => eq(brandsDB.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        products: includeProducts || undefined,
      },
    });

    reply.code(201).send(brand);
  });

  function getBrandsBy(queryBy: TBrandQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TBrandQueryParam;
      const { includeOwner, includeProducts, includeShop } =
        req.query as TBrandQueryString;

      const brands = await fastify.db.query.brandsDB.findMany({
        where: (brandsDB, { eq }) => eq(brandsDB[queryBy], id),
        with: {
          owner: includeOwner || undefined,
          products: includeProducts || undefined,
          shop: includeShop || undefined,
        },
      });

      reply.code(200).send(brands);
    };
  }

  // get brands by owner id
  fastify.get<{
    Params: TBrandQueryParam;
    Querystring: TBrandQueryString;
  }>("/owner/:id", QueryBrandByOwnerOpts, getBrandsBy("ownerId"));

  // get brands by shop id
  fastify.get<{
    Params: TBrandQueryParam;
    Querystring: TBrandQueryString;
  }>("/shop/:id", QueryBrandByOwnerOpts, getBrandsBy("shopId"));
};

export default BrandRoutes;
