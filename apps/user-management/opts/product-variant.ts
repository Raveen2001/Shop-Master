import { RouteShorthandOptions } from "fastify";
import {
  ProductVariantQueryParamSchema,
  ProductVariantQueryStringSchema,
  ProductVariantSchema,
  ProductVariantSchemaIn,
} from "../types/product-variant";
import { Type } from "@sinclair/typebox";

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

export const QueryProductVariantsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product-Variant"],
    summary: "Get ProductVariants by id",
    params: ProductVariantQueryParamSchema,
    querystring: ProductVariantQueryStringSchema,
    response: {
      200: Type.Array(ProductVariantSchema),
    },
  },
};
