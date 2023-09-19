import { TNewProductCategoryDB, productCategoriesDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  TCategoryQueryByFields,
  TCategoryQueryParam,
  TCategoryQueryString,
} from "../types/category";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateCategoryOpts,
  QueryCategoryByOwnerOpts,
  QueryCategoryOpts,
} from "../opts/category";
import { RouteHandlerMethod } from "fastify";

const CategoryRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // get category by id
  fastify.get<{
    Params: TCategoryQueryParam;
    Querystring: TCategoryQueryString;
  }>("/:id", QueryCategoryOpts, async (req, reply) => {
    const { includeOwner, includeProducts, includeShop, includeSubCategories } =
      req.query;

    const category = await fastify.db.query.productCategoriesDB.findFirst({
      where: (productCategoriesDB, { eq }) =>
        eq(productCategoriesDB.id, req.params.id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        products: includeProducts || undefined,
        subCategories: includeSubCategories || undefined,
      },
    });

    if (!category) {
      reply.code(404).send({ message: "Category not found" });
      return;
    }

    reply.code(200).send(category);
  });

  // create category
  fastify.post<{
    Querystring: TCategoryQueryString;
    Body: TNewProductCategoryDB;
  }>("/create", CreateCategoryOpts, async (req, reply) => {
    const { includeOwner, includeProducts, includeShop } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(productCategoriesDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: productCategoriesDB.id })
    )[0];

    const category = await fastify.db.query.productCategoriesDB.findFirst({
      where: (productCategoriesDB, { eq }) =>
        eq(productCategoriesDB.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        products: includeProducts || undefined,
      },
    });

    reply.code(201).send(category);
  });

  // query categorys
  function getCategorysBy(queryBy: TCategoryQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TCategoryQueryParam;
      const {
        includeOwner,
        includeProducts,
        includeShop,
        includeSubCategories,
      } = req.query as TCategoryQueryString;

      const categorys = await fastify.db.query.productCategoriesDB.findMany({
        where: (productCategoriesDB, { eq }) =>
          eq(productCategoriesDB[queryBy], id),
        with: {
          owner: includeOwner || undefined,
          products: includeProducts || undefined,
          shop: includeShop || undefined,
          subCategories: includeSubCategories || undefined,
        },
      });

      reply.code(200).send(categorys);
    };
  }

  // get categorys by owner id
  fastify.get<{
    Params: TCategoryQueryParam;
    Querystring: TCategoryQueryString;
  }>("/owner/:id", QueryCategoryByOwnerOpts, getCategorysBy("ownerId"));

  // get categorys by shop id
  fastify.get<{
    Params: TCategoryQueryParam;
    Querystring: TCategoryQueryString;
  }>("/shop/:id", QueryCategoryByOwnerOpts, getCategorysBy("shopId"));
};

export default CategoryRoutes;
