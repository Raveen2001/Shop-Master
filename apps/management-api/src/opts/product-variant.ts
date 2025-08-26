import { RouteShorthandOptions } from "fastify";
import {
  ProductVariantQueryParamSchema,
  ProductVariantQueryStringSchema,
  ProductVariantSchema,
  ProductVariantSchemaIn,
} from "../types/product-variant.js";
import { Type } from "@sinclair/typebox";
import { ownerOnlyRoute } from "../preHooks/permissions.js";

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
  preHandler: ownerOnlyRoute,
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

export const UpdateProductVariantOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product-Variant"],
    summary: "Update a ProductVariant",
    params: ProductVariantQueryParamSchema,
    body: Type.Partial(ProductVariantSchemaIn),
    response: {
      200: ProductVariantSchema,
    },
  },
  preHandler: ownerOnlyRoute,
};
