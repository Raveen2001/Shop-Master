import { TNewProductVariantsDB, productVariantsDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  TProductVariantQueryByFields,
  TProductVariantQueryParam,
  TProductVariantQueryString,
} from "../types/product-variant";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateProductVariantOpts,
  QueryProductVariantOpts,
  QueryProductVariantsByIdOpts,
} from "../opts/product-variant";
import { RouteHandlerMethod } from "fastify";

const ProductVariantRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // create productVariant
  fastify.post<{
    Querystring: TProductVariantQueryString;
    Body: TNewProductVariantsDB;
  }>("/create", CreateProductVariantOpts, async (req, reply) => {
    const { includeOwner, includeProduct, includeShop } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(productVariantsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: productVariantsDB.id })
    )[0];

    const productVariant = await fastify.db.query.productVariantsDB.findFirst({
      where: (productVariantsDB, { eq }) =>
        eq(productVariantsDB.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
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
    const { includeOwner, includeProduct, includeShop } = req.query;

    const productVariant = await fastify.db.query.productVariantsDB.findFirst({
      where: (productVariantsDB, { eq }) =>
        eq(productVariantsDB.id, req.params.id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
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
      const { includeOwner, includeProduct, includeShop } =
        req.query as TProductVariantQueryString;

      const productVariants = await fastify.db.query.productVariantsDB.findMany(
        {
          where: (productVariantsDB, { eq }) =>
            eq(productVariantsDB[queryBy], id),
          with: {
            owner: includeOwner || undefined,
            product: includeProduct || undefined,
            shop: includeShop || undefined,
          },
        }
      );

      reply.code(200).send(productVariants);
    };
  }

  // get subCategories by owner id
  fastify.get<{
    Params: TProductVariantQueryParam;
    Querystring: TProductVariantQueryString;
  }>(
    "/owner/:id",
    QueryProductVariantsByIdOpts,
    getProductVariantsBy("ownerId")
  );

  // get subCategories by shop id
  fastify.get<{
    Params: TProductVariantQueryParam;
    Querystring: TProductVariantQueryString;
  }>("/shop/:id", QueryProductVariantsByIdOpts, getProductVariantsBy("shopId"));
};

export default ProductVariantRoutes;
