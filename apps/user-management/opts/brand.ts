import { RouteShorthandOptions } from "fastify";
import {
  BrandQueryParamSchema,
  BrandSchemaOut,
  BrandSchemaIn,
  BrandQueryStringSchema,
} from "../types/brand";
import { Type } from "@sinclair/typebox";

export const QueryBrandOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Brand"],
    summary: "Get Brand by brand_id",
    params: BrandQueryParamSchema,
    querystring: BrandQueryStringSchema,
    response: {
      200: BrandSchemaOut,
    },
  },
};

export const QueryBrandByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Brand"],
    summary: "Get Brands by owner_id",
    params: BrandQueryParamSchema,
    querystring: BrandQueryStringSchema,
    response: {
      200: Type.Array(BrandSchemaOut),
    },
  },
};

export const QueryBrandByShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Brand"],
    summary: "Get Brands by shop_id",
    params: BrandQueryParamSchema,
    querystring: BrandQueryStringSchema,
    response: {
      200: Type.Array(BrandSchemaOut),
    },
  },
};

export const CreateBrandOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Brand"],
    summary: "Create a new Brand",
    body: BrandSchemaIn,
    querystring: BrandQueryStringSchema,
    response: {
      201: BrandSchemaOut,
    },
  },
};
