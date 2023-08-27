import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { OwnerSchemaWithoutPassword } from "./owner";
import { EmployeeSchema } from "./employee";
import { PagableQueryStringSchema, PagableSchema } from "./common";
import { SHOP_DB_COLUMNS } from "database-drizzle";

export const ShopSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  address: Type.String({ minLength: 3 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  email: Type.Optional(Type.String({ format: "email" })),
  website: Type.Optional(Type.String({ format: "uri" })),
  description: Type.String({ minLength: 3 }),
  ownerId: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
});

export const ShopSchemaIn = Type.Omit(ShopSchema, ["id", "createdAt"]);

export const ShopSchemaOut = Type.Intersect([
  ShopSchema,
  Type.Object({
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    employees: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);

export const PagableShopSchemaOut = PagableSchema(ShopSchemaOut);

export type TShopSchema = Static<typeof ShopSchema>;
export type TShopIn = Static<typeof ShopSchemaIn>;
export type TShopOut = Static<typeof ShopSchemaOut>;
export type TPagableShopOut = Static<typeof PagableShopSchemaOut>;

export const ShopQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const ShopQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeEmployees: Type.Boolean({ default: false }),
});

export const PagableShopQueryStringSchema = PagableQueryStringSchema(
  ShopQueryStringSchema,
  SHOP_DB_COLUMNS
);

export type TShopQueryParam = Static<typeof ShopQueryParamSchema>;
export type TShopQueryString = Static<typeof ShopQueryStringSchema>;
export type TPagableShopQueryString = Static<
  typeof PagableShopQueryStringSchema
>;

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
