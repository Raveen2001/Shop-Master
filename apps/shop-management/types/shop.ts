import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { OwnerSchemaDependency } from "./owner";

export const ShopSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  address: Type.String({ minLength: 3 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  email: Type.Optional(Type.String({ format: "email" })),
  website: Type.Optional(Type.String({ format: "uri" })),
  description: Type.String({ minLength: 3 }),
  image: Type.Array(Type.String({ format: "uri" })),
  ownerId: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  owner: Type.Optional(OwnerSchemaDependency),
  // employees: Type.Optional(Type.Array(OwnerSchema)),
});

export const ShopSchemaIn = Type.Omit(ShopSchema, [
  "id",
  "createdAt",
  "updatedAt",
  "owner",
  // "employees",
]);
export const ShopSchemaOut = Type.Omit(ShopSchema, ["ownerId"]);
export const ShopSchemaDependency = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  address: Type.String({ minLength: 3 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  email: Type.Optional(Type.String({ format: "email" })),
  website: Type.Optional(Type.String({ format: "uri" })),
  description: Type.String({ minLength: 3 }),
  image: Type.Array(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type TShopSchema = Static<typeof ShopSchema>;
export type TShopIn = Static<typeof ShopSchemaIn>;

export const ShopQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const ShopQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeEmployees: Type.Boolean({ default: false }),
});

export type TShopQueryParam = Static<typeof ShopQueryParamSchema>;
export type TShopQueryString = Static<typeof ShopQueryStringSchema>;

export const QueryShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Shop"],
    summary: "Get a shop by shop_id",
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
    summary: "Get a shop by owner_id",
    params: ShopQueryParamSchema,
    querystring: ShopQueryStringSchema,
    response: {
      200: Type.Array(ShopSchemaOut),
    },
  },
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
};
