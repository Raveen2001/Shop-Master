import { RouteShorthandOptions } from "fastify";
import {
  ShopSchemaOut,
  PagableShopQueryStringSchema,
  PagableShopSchemaOut,
  ShopSchemaIn,
} from "../types/shop.js";
import { ownerOnlyRoute } from "../preHooks/permissions.js";

export const QueryShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Get shop by token",
    response: {
      200: ShopSchemaOut,
    },
  },
};

export const QueryShopByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Get shops by owner token",
    querystring: PagableShopQueryStringSchema,
    response: {
      200: PagableShopSchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};

export const CreateShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Create a new shop",
    body: ShopSchemaIn,
    response: {
      201: ShopSchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};
