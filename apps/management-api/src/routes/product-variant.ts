import { TNewProductVariantsDB, productVariantsDB } from "database-drizzle";
import { eq } from "drizzle-orm";
import FastifyTypebox from "../types/fastify.js";
import {
  TProductVariantQueryByFields,
  TProductVariantQueryParam,
  TProductVariantQueryString,
} from "../types/product-variant.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateProductVariantOpts,
  QueryProductVariantOpts,
  QueryProductVariantsByIdOpts,
  UpdateProductVariantOpts,
} from "../opts/product-variant.js";
import { RouteHandlerMethod } from "fastify";

const ProductVariantRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // create productVariant
  fastify.post<{
    Querystring: TProductVariantQueryString;
    Body: TNewProductVariantsDB;
  }>("/create", CreateProductVariantOpts, async (req, reply) => {
    const { includeProduct } = req.query;

    const productVariantBody = req.body;
    productVariantBody.ownerId = req.userInfo.data.id;

    const { insertedId } = (
      await fastify.db
        .insert(productVariantsDB)
        .values(productVariantBody)
        .onConflictDoNothing()
        .returning({ insertedId: productVariantsDB.id })
    )[0];

    const productVariant = await fastify.db.query.productVariantsDB.findFirst({
      where: (productVariantsDB, { eq }) =>
        eq(productVariantsDB.id, insertedId),
      with: {
        product: includeProduct || undefined,
      },
    });

    reply.code(201).send(productVariant);
  });

  // get productVariant by id
  fastify.get<{
    Params: TProductVariantQueryParam;
    Querystring: TProductVariantQueryString;
  }>("/:id", QueryProductVariantOpts, async (req, reply) => {
    // TODO: query based on ownerId and shopId

    const { includeProduct } = req.query;

    const productVariant = await fastify.db.query.productVariantsDB.findFirst({
      where: (productVariantsDB, { eq }) =>
        eq(productVariantsDB.id, req.params.id),

      with: {
        product: includeProduct || undefined,
      },
    });

    if (!productVariant) {
      reply.code(404).send({ message: "ProductVariant not found" });
      return;
    }

    reply.code(200).send(productVariant);
  });

  // query productVariants by
  function getProductVariantsBy(
    queryBy: TProductVariantQueryByFields
  ): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TProductVariantQueryParam;
      const { includeProduct } = req.query as TProductVariantQueryString;

      const productVariants = await fastify.db.query.productVariantsDB.findMany(
        {
          where: (productVariantsDB, { eq }) =>
            eq(productVariantsDB[queryBy], id),
          with: {
            product: includeProduct || undefined,
          },
        }
      );

      reply.code(200).send(productVariants);
    };
  }

  // get productVariants by owner id
  fastify.get<{
    Params: TProductVariantQueryParam;
    Querystring: TProductVariantQueryString;
  }>(
    "/owner/:id",
    QueryProductVariantsByIdOpts,
    getProductVariantsBy("ownerId")
  );

  // get productVariants by shop id
  fastify.get<{
    Params: TProductVariantQueryParam;
    Querystring: TProductVariantQueryString;
  }>("/shop/:id", QueryProductVariantsByIdOpts, getProductVariantsBy("shopId"));

  // update product variant
  fastify.put<{
    Params: TProductVariantQueryParam;
    Body: Partial<TNewProductVariantsDB>;
  }>("/:id", UpdateProductVariantOpts, async (req, reply) => {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure the product variant belongs to the user
    const existingVariant = await fastify.db.query.productVariantsDB.findFirst({
      where: (productVariantsDB, { eq, and }) =>
        and(
          eq(productVariantsDB.id, id),
          eq(productVariantsDB.ownerId, req.userInfo.data.id)
        ),
    });

    if (!existingVariant) {
      reply
        .code(404)
        .send({ message: "Product variant not found or unauthorized" });
      return;
    }

    // Update the product variant
    const updatedVariant = await fastify.db
      .update(productVariantsDB)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(productVariantsDB.id, id))
      .returning()
      .then((rows) => rows[0]);

    reply.code(200).send(updatedVariant);
  });

  // delete product variant
  fastify.delete<{
    Params: TProductVariantQueryParam;
  }>("/:id", async (req, reply) => {
    const { id } = req.params;

    // Ensure the product variant belongs to the user
    const existingVariant = await fastify.db.query.productVariantsDB.findFirst({
      where: (productVariantsDB, { eq, and }) =>
        and(
          eq(productVariantsDB.id, id),
          eq(productVariantsDB.ownerId, req.userInfo.data.id)
        ),
    });

    if (!existingVariant) {
      reply
        .code(404)
        .send({ message: "Product variant not found or unauthorized" });
      return;
    }

    // Delete the product variant
    await fastify.db
      .delete(productVariantsDB)
      .where(eq(productVariantsDB.id, id));

    reply.code(200).send({ message: "Product variant deleted successfully" });
  });
};

export default ProductVariantRoutes;
