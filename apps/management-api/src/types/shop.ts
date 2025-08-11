import { Static, Type } from "@sinclair/typebox";
import { EmployeeSchema } from "./employee.js";
import { PagableQuerySchema, PagableSchema } from "./common.js";
import { SHOP_DB_COLUMNS } from "database-drizzle";
import { optionalType } from "./utils.js";

export const ShopSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  domain: Type.String({ minLength: 3, maxLength: 50 }),
  address: Type.String({ minLength: 3 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  email: optionalType(Type.String({ format: "email" })),
  website: Type.Union([Type.String({ format: "uri" }), Type.Null()]),
  image: optionalType(Type.String({ format: "uri" })),
  description: Type.String({ minLength: 3 }),
  ownerId: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const ShopSchemaIn = Type.Omit(ShopSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const ShopSchemaOut = Type.Intersect([
  ShopSchema,
  Type.Object({
    employees: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);

export const PagableShopSchemaOut = PagableSchema(ShopSchemaOut);

export type TShopSchema = Static<typeof ShopSchema>;
export type TShopIn = Static<typeof ShopSchemaIn>;
export type TShopOut = Static<typeof ShopSchemaOut>;
export type TPagableShopOut = Static<typeof PagableShopSchemaOut>;

export const PagableShopQueryStringSchema = PagableQuerySchema(SHOP_DB_COLUMNS);

export type TPagableShopQueryString = Static<
  typeof PagableShopQueryStringSchema
>;
