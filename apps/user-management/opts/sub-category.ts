import { RouteShorthandOptions } from "fastify";
import {
  SubCategoryQueryParamSchema,
  SubCategorySchemaOut,
  SubCategorySchemaIn,
  SubCategoryQueryStringSchema,
} from "../types/sub-category";
import { Type } from "@sinclair/typebox";

export const QuerySubCategoryOpts: RouteShorthandOptions = {
  schema: {
    tags: ["SubCategory"],
    summary: "Get SubCategory by subSubCategory_id",
    params: SubCategoryQueryParamSchema,
    querystring: SubCategoryQueryStringSchema,
    response: {
      200: SubCategorySchemaOut,
    },
  },
};

export const QuerySubCategoryByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["SubCategory"],
    summary: "Get SubCategorys by owner_id",
    params: SubCategoryQueryParamSchema,
    querystring: SubCategoryQueryStringSchema,
    response: {
      200: Type.Array(SubCategorySchemaOut),
    },
  },
};

export const QuerySubCategoryByShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["SubCategory"],
    summary: "Get SubCategorys by shop_id",
    params: SubCategoryQueryParamSchema,
    querystring: SubCategoryQueryStringSchema,
    response: {
      200: Type.Array(SubCategorySchemaOut),
    },
  },
};

export const CreateSubCategoryOpts: RouteShorthandOptions = {
  schema: {
    tags: ["SubCategory"],
    summary: "Create a new SubCategory",
    body: SubCategorySchemaIn,
    querystring: SubCategoryQueryStringSchema,
    response: {
      201: SubCategorySchemaOut,
    },
  },
};
