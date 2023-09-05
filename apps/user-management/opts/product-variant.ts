import { RouteShorthandOptions } from "fastify";
import {
  ProductVariantQueryParamSchema,
  ProductVariantQueryStringSchema,
  ProductVariantSchema,
  ProductVariantSchemaIn,
} from "../types/product-variant";

export const QueryProductVariantOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product-Variant"],
    summary: "Get ProductVariant by product_variant_id",
    params: ProductVariantQueryParamSchema,
    querystring: ProductVariantQueryStringSchema,
    response: {
      200: ProductVariantSchema,
    },
  },
};

export const CreateProductVariantOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product-Variant"],
    summary: "Create a new ProductVariant",
    body: ProductVariantSchemaIn,
    querystring: ProductVariantQueryStringSchema,
    response: {
      201: ProductVariantSchema,
    },
  },
};
