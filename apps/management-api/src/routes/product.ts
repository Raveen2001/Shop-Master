import { TNewProductsDB, productsDB } from "database-drizzle";
import { eq } from "drizzle-orm";
import FastifyTypebox from "../types/fastify.js";
import {
  TProductQueryByFields,
  TProductQueryParam,
  TProductQueryString,
} from "../types/product.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateProductOpts,
  QueryProductOpts,
  QueryProductsByIdOpts,
  UpdateProductOpts,
} from "../opts/product.js";
import { RouteHandlerMethod } from "fastify";

const ProductRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // create product
  fastify.post<{
    Querystring: TProductQueryString;
    Body: TNewProductsDB;
  }>("/create", CreateProductOpts, async (req, reply) => {
    const { includeVariants } = req.query;
    const productData = req.body;

    const { insertedId } = (
      await fastify.db
        .insert(productsDB)
        .values(productData)
        .onConflictDoNothing()
        .returning({ insertedId: productsDB.id })
    )[0];

    const product = await fastify.db.query.productsDB.findFirst({
      where: (productsDB, { eq }) => eq(productsDB.id, insertedId),
      with: {
        variants: includeVariants || undefined,
      },
    });

    reply.code(201).send(product);
  });

  // get product by id
  fastify.get<{
    Params: TProductQueryParam;
    Querystring: TProductQueryString;
  }>("/:id", QueryProductOpts, async (req, reply) => {
    const { includeVariants } = req.query;

    const product = await fastify.db.query.productsDB.findFirst({
      where: (productsDB, { eq }) => eq(productsDB.id, req.params.id),

      with: {
        variants: includeVariants || undefined,
      },
    });

    if (!product) {
      reply.code(404).send({ message: "Product not found" });
      return;
    }

    reply.code(200).send(product);
  });

  // query products by
  function getProductsBy(queryBy: TProductQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TProductQueryParam;
      const { includeVariants } = req.query as TProductQueryString;

      const products = await fastify.db.query.productsDB.findMany({
        where: (productsDB, { eq }) => eq(productsDB[queryBy], id),
        with: {
          variants: includeVariants || undefined,
        },
        orderBy: (productsDB, { desc }) => [desc(productsDB.tamilName)],
      });

      reply.code(200).send(products);
    };
  }

  // get subCategories by owner id
  fastify.get<{
    Params: TProductQueryParam;
    Querystring: TProductQueryString;
  }>("/owner/:id", QueryProductsByIdOpts, getProductsBy("ownerId"));

  // get subCategories by shop id
  fastify.get<{
    Params: TProductQueryParam;
    Querystring: TProductQueryString;
  }>("/shop/:id", QueryProductsByIdOpts, getProductsBy("shopId"));

  // update product
  fastify.put<{
    Params: TProductQueryParam;
    Body: Partial<TNewProductsDB>;
  }>("/:id", UpdateProductOpts, async (req, reply) => {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure the product belongs to the user
    const existingProduct = await fastify.db.query.productsDB.findFirst({
      where: (productsDB, { eq, and }) =>
        and(
          eq(productsDB.id, id),
          eq(productsDB.ownerId, req.userInfo.data.id)
        ),
    });

    if (!existingProduct) {
      reply.code(404).send({ message: "Product not found or unauthorized" });
      return;
    }

    // Update the product
    const updatedProduct = await fastify.db
      .update(productsDB)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(productsDB.id, id))
      .returning()
      .then((rows) => rows[0]);

    reply.code(200).send(updatedProduct);
  });

  // delete product
  fastify.delete<{
    Params: TProductQueryParam;
  }>("/:id", async (req, reply) => {
    const { id } = req.params;

    // Ensure the product belongs to the user
    const existingProduct = await fastify.db.query.productsDB.findFirst({
      where: (productsDB, { eq, and }) =>
        and(
          eq(productsDB.id, id),
          eq(productsDB.ownerId, req.userInfo.data.id)
        ),
      with: {
        variants: true,
      },
    });

    if (!existingProduct) {
      reply.code(404).send({ message: "Product not found or unauthorized" });
      return;
    }

    // Check if product has variants
    if (existingProduct.variants && existingProduct.variants.length > 0) {
      reply.code(400).send({
        message:
          "Cannot delete product with existing variants. Please remove variants first.",
      });
      return;
    }

    // Delete the product
    await fastify.db.delete(productsDB).where(eq(productsDB.id, id));

    reply.code(200).send({ message: "Product deleted successfully" });
  });
};

export default ProductRoutes;
