import { RouteShorthandOptions } from "fastify";
import {
  ProductQueryParamSchema,
  ProductQueryStringSchema,
  ProductSchemaIn,
  ProductSchemaOut,
} from "../types/product";

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
};
