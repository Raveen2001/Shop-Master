import { RouteShorthandOptions } from "fastify";
import {
  ShopQueryParamSchema,
  ShopQueryStringSchema,
  ShopSchemaOut,
  PagableShopQueryStringSchema,
  PagableShopSchemaOut,
  ShopSchemaIn,
} from "../types/shop.types";

export const QueryShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Get shop by shop_id",
    params: ShopQueryParamSchema,
    querystring: ShopQueryStringSchema,
    response: {
      200: ShopSchemaOut,
    },
  },
};

export const QueryShopByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Get shops by owner_id",
    params: ShopQueryParamSchema,
    querystring: PagableShopQueryStringSchema,
    response: {
      200: PagableShopSchemaOut,
    },
  },
};

export const CreateShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Create a new shop",
    body: ShopSchemaIn,
    querystring: ShopQueryStringSchema,
    response: {
      201: ShopSchemaOut,
    },
  },
};
