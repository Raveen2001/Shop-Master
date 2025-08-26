import { RouteShorthandOptions } from "fastify";
import {
  CategoryQueryParamSchema,
  CategorySchemaOut,
  CategorySchemaIn,
  CategoryQueryStringSchema,
} from "../types/category.js";
import { Type } from "@sinclair/typebox";
import { ownerOnlyRoute } from "../preHooks/permissions.js";

export const CreateCategoryOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Category"],
    summary: "Create a new Category",
    body: CategorySchemaIn,
    response: {
      201: CategorySchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};

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

export const UpdateCategoryOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Category"],
    summary: "Update a Category",
    params: CategoryQueryParamSchema,
    body: Type.Partial(CategorySchemaIn),
    response: {
      200: CategorySchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};
