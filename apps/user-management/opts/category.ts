import { RouteShorthandOptions } from "fastify";
import {
  CategoryQueryParamSchema,
  CategorySchemaOut,
  CategorySchemaIn,
  CategoryQueryStringSchema,
} from "../types/category";
import { Type } from "@sinclair/typebox";

export const QueryCategoryOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Category"],
    summary: "Get Category by category_id",
    params: CategoryQueryParamSchema,
    querystring: CategoryQueryStringSchema,
    response: {
      200: CategorySchemaOut,
    },
  },
};

export const QueryCategoryByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Category"],
    summary: "Get Categorys by owner_id",
    params: CategoryQueryParamSchema,
    querystring: CategoryQueryStringSchema,
    response: {
      200: Type.Array(CategorySchemaOut),
    },
  },
};

export const QueryCategoryByShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Category"],
    summary: "Get Categorys by shop_id",
    params: CategoryQueryParamSchema,
    querystring: CategoryQueryStringSchema,
    response: {
      200: Type.Array(CategorySchemaOut),
    },
  },
};

export const CreateCategoryOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Category"],
    summary: "Create a new Category",
    body: CategorySchemaIn,
    querystring: CategoryQueryStringSchema,
    response: {
      201: CategorySchemaOut,
    },
  },
};
