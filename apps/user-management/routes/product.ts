import { TNewProductsDB, productsDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  TProductQueryByFields,
  TProductQueryParam,
  TProductQueryString,
} from "../types/product";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateProductOpts,
  QueryProductOpts,
  QueryProductsByIdOpts,
} from "../opts/product";
import { RouteHandlerMethod } from "fastify";

const ProductRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // create product
  fastify.post<{
    Querystring: TProductQueryString;
    Body: TNewProductsDB;
  }>("/create", CreateProductOpts, async (req, reply) => {
    const { includeOwner, includeVariants, includeShop } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(productsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: productsDB.id })
    )[0];

    const product = await fastify.db.query.productsDB.findFirst({
      where: (productsDB, { eq }) => eq(productsDB.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
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
    const { includeOwner, includeVariants, includeShop } = req.query;

    const product = await fastify.db.query.productsDB.findFirst({
      where: (productsDB, { eq }) => eq(productsDB.id, req.params.id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        variants: includeVariants || undefined,
      },
    });

    if (!product) {
      reply.code(404).send({ message: "Product not found" });
      return;
    }

    reply.code(200).send(product);
  });

  // query subCategories
  function getProductsBy(queryBy: TProductQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TProductQueryParam;
      const { includeOwner, includeVariants, includeShop } =
        req.query as TProductQueryString;

      const products = await fastify.db.query.productsDB.findMany({
        where: (productsDB, { eq }) => eq(productsDB[queryBy], id),
        with: {
          owner: includeOwner || undefined,
          variants: includeVariants || undefined,
          shop: includeShop || undefined,
        },
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
};

export default ProductRoutes;
