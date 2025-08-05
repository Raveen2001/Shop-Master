import { TNewProductCategoryDB, productCategoriesDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify.js";
import {
  TCategoryQueryByFields,
  TCategoryQueryParam,
  TCategoryQueryString,
} from "../types/category.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateCategoryOpts,
  QueryCategoryByOwnerOpts,
  QueryCategoryOpts,
} from "../opts/category.js";
import { RouteHandlerMethod } from "fastify";

const CategoryRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // get category by id
  fastify.get<{
    Params: TCategoryQueryParam;
    Querystring: TCategoryQueryString;
  }>("/:id", QueryCategoryOpts, async (req, reply) => {
    const { includeProducts, includeSubCategories } = req.query;

    const category = await fastify.db.query.productCategoriesDB.findFirst({
      where: (productCategoriesDB, { eq }) =>
        eq(productCategoriesDB.id, req.params.id),

      with: {
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
    Body: TNewProductCategoryDB;
  }>("/create", CreateCategoryOpts, async (req, reply) => {
    const categoryBody = req.body;
    categoryBody.ownerId = req.userInfo.data.id;

    const { insertedId } = (
      await fastify.db
        .insert(productCategoriesDB)
        .values(categoryBody)
        .onConflictDoNothing()
        .returning({ insertedId: productCategoriesDB.id })
    )[0];

    const category = await fastify.db.query.productCategoriesDB.findFirst({
      where: (productCategoriesDB, { eq }) =>
        eq(productCategoriesDB.id, insertedId),
    });

    reply.code(201).send(category);
  });

  // query categorys
  function getCategorysBy(queryBy: TCategoryQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { id } = req.params as TCategoryQueryParam;
      const { includeProducts, includeSubCategories } =
        req.query as TCategoryQueryString;

      const categorys = await fastify.db.query.productCategoriesDB.findMany({
        where: (productCategoriesDB, { eq }) =>
          eq(productCategoriesDB[queryBy], id),
        with: {
          products: includeProducts || undefined,
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
