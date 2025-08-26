import { RouteShorthandOptions } from "fastify";
import {
  ProductQueryParamSchema,
  ProductQueryStringSchema,
  ProductSchemaIn,
  ProductSchemaOut,
} from "../types/product.js";
import { Type } from "@sinclair/typebox";
import { ownerOnlyRoute } from "../preHooks/permissions.js";

export const CreateProductOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product"],
    summary: "Create a new Product",
    body: ProductSchemaIn,
    querystring: ProductQueryStringSchema,
    response: {
      201: ProductSchemaOut,
    },
  },

  preHandler: ownerOnlyRoute,
};

export const QueryProductOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product"],
    summary: "Get Product by product_id",
    params: ProductQueryParamSchema,
    querystring: ProductQueryStringSchema,
    response: {
      200: ProductSchemaOut,
    },
  },
};

export const QueryProductsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product"],
    summary: "Get all products by id",
    params: ProductQueryParamSchema,
    querystring: ProductQueryStringSchema,
    response: {
      200: Type.Array(ProductSchemaOut),
    },
  },
};

export const UpdateProductOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Product"],
    summary: "Update a Product",
    params: ProductQueryParamSchema,
    body: Type.Partial(ProductSchemaIn),
    response: {
      200: ProductSchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};
