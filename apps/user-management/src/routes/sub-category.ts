import {
  TNewProductSubCategoryDB,
  productSubCategoriesDB,
} from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  TSubCategoryQueryByFields,
  TSubCategoryQueryParam,
  TSubCategoryQueryString,
} from "../types/sub-category";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateSubCategoryOpts,
  QuerySubCategoryByOwnerOpts,
  QuerySubCategoryByShopOpts,
  QuerySubCategoryOpts,
} from "../opts/sub-category";
import { RouteHandlerMethod } from "fastify";

const SubCategoryRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // get sub-category by id
  fastify.get<{
    Params: TSubCategoryQueryParam;
    Querystring: TSubCategoryQueryString;
  }>("/:id", QuerySubCategoryOpts, async (req, reply) => {
    const { includeOwner, includeProducts, includeShop } = req.query;

    const subCategory = await fastify.db.query.productSubCategoriesDB.findFirst(
      {
        where: (productSubCategoriesDB, { eq }) =>
          eq(productSubCategoriesDB.id, req.params.id),

        with: {
          owner: includeOwner || undefined,
          shop: includeShop || undefined,
          products: includeProducts || undefined,
        },
      }
    );

    if (!subCategory) {
      reply.code(404).send({ message: "SubCategory not found" });
      return;
    }

    reply.code(200).send(subCategory);
  });

  // create sub-category
  fastify.post<{
    Querystring: TSubCategoryQueryString;
    Body: TNewProductSubCategoryDB;
  }>("/create", CreateSubCategoryOpts, async (req, reply) => {
    const { includeOwner, includeProducts, includeShop } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(productSubCategoriesDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: productSubCategoriesDB.id })
    )[0];

    const subCategory = await fastify.db.query.productSubCategoriesDB.findFirst(
      {
        where: (productSubCategoriesDB, { eq }) =>
          eq(productSubCategoriesDB.id, insertedId),
        with: {
          owner: includeOwner || undefined,
          shop: includeShop || undefined,
          products: includeProducts || undefined,
        },
      }
    );

    reply.code(201).send(subCategory);
  });

  // query subCategories
  function getSubCategorysBy(
    queryBy: TSubCategoryQueryByFields
  ): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TSubCategoryQueryParam;
      const { includeOwner, includeProducts, includeShop } =
        req.query as TSubCategoryQueryString;

      const subCategories =
        await fastify.db.query.productSubCategoriesDB.findMany({
          where: (productSubCategoriesDB, { eq }) =>
            eq(productSubCategoriesDB[queryBy], id),
          with: {
            owner: includeOwner || undefined,
            products: includeProducts || undefined,
            shop: includeShop || undefined,
          },
        });

      reply.code(200).send(subCategories);
    };
  }

  // get subCategories by owner id
  fastify.get<{
    Params: TSubCategoryQueryParam;
    Querystring: TSubCategoryQueryString;
  }>("/owner/:id", QuerySubCategoryByOwnerOpts, getSubCategorysBy("ownerId"));

  // get subCategories by shop id
  fastify.get<{
    Params: TSubCategoryQueryParam;
    Querystring: TSubCategoryQueryString;
  }>("/shop/:id", QuerySubCategoryByShopOpts, getSubCategorysBy("shopId"));
};

export default SubCategoryRoutes;
