import { TNewProductVariantsDB, productVariantsDB } from "database-drizzle";
import FastifyTypebox from "../types/fastify";
import {
  TProductVariantQueryParam,
  TProductVariantQueryString,
} from "../types/product-variant";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateProductVariantOpts,
  QueryProductVariantOpts,
} from "../opts/product-variant";

const ProductVariantRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
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
};

export default ProductVariantRoutes;
