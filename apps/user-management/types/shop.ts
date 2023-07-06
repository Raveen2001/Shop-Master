import { employeesDB } from "./../../../packages/database-drizzle/schema/employees";
import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { OwnerSchema, OwnerSchemaWithoutPassword } from "./owner";
import { EmployeeSchema } from "./employee";

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
export type TShopOut = Static<typeof ShopSchemaOut>;

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
    querystring: ShopQueryStringSchema,
    response: {
      201: ShopSchemaOut,
    },
  },
};
