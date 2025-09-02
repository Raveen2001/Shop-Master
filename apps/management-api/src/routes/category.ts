import { TNewProductCategoryDB, productCategoriesDB } from "database-drizzle";
import { eq } from "drizzle-orm";
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
  UpdateCategoryOpts,
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
    const categoryData = req.body;
    categoryData.ownerId = req.userInfo.data.id;

    const { insertedId } = (
      await fastify.db
        .insert(productCategoriesDB)
        .values(categoryData)
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
        orderBy: (productCategoriesDB, { desc }) => [
          desc(productCategoriesDB.orderPriority),
        ],
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

  // update category
  fastify.put<{
    Params: TCategoryQueryParam;
    Body: Partial<TNewProductCategoryDB>;
  }>("/:id", UpdateCategoryOpts, async (req, reply) => {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure the category belongs to the user
    const existingCategory =
      await fastify.db.query.productCategoriesDB.findFirst({
        where: (productCategoriesDB, { eq, and }) =>
          and(
            eq(productCategoriesDB.id, id),
            eq(productCategoriesDB.ownerId, req.userInfo.data.id)
          ),
      });

    if (!existingCategory) {
      reply.code(404).send({ message: "Category not found or unauthorized" });
      return;
    }

    // Update the category
    const updatedCategory = await fastify.db
      .update(productCategoriesDB)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(productCategoriesDB.id, id))
      .returning()
      .then((rows) => rows[0]);

    reply.code(200).send(updatedCategory);
  });

  // delete category
  fastify.delete<{
    Params: TCategoryQueryParam;
  }>("/:id", async (req, reply) => {
    const { id } = req.params;

    // Ensure the category belongs to the user
    const existingCategory =
      await fastify.db.query.productCategoriesDB.findFirst({
        where: (productCategoriesDB, { eq, and }) =>
          and(
            eq(productCategoriesDB.id, id),
            eq(productCategoriesDB.ownerId, req.userInfo.data.id)
          ),
        with: {
          products: true,
          subCategories: true,
        },
      });

    if (!existingCategory) {
      reply.code(404).send({ message: "Category not found or unauthorized" });
      return;
    }

    // Check if category has products or subcategories
    if (existingCategory.products && existingCategory.products.length > 0) {
      reply.code(400).send({
        message:
          "Cannot delete category with existing products. Please remove or reassign products first.",
      });
      return;
    }

    if (
      existingCategory.subCategories &&
      existingCategory.subCategories.length > 0
    ) {
      reply.code(400).send({
        message:
          "Cannot delete category with existing subcategories. Please remove or reassign subcategories first.",
      });
      return;
    }

    // Delete the category
    await fastify.db
      .delete(productCategoriesDB)
      .where(eq(productCategoriesDB.id, id));

    reply.code(200).send({ message: "Category deleted successfully" });
  });
};

export default CategoryRoutes;
