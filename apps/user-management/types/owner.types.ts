import { Static, Type } from "@sinclair/typebox";
import { EmployeeSchema } from "./employee.types";
import { ShopSchema } from "./shop.types";

export const OwnerSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  email: Type.String({ format: "email" }),
  password: Type.String({
    minLength: 8,
  }),
  image: Type.Union([Type.Null(), Type.String({ format: "uri" })]),
  createdAt: Type.String({ format: "date-time" }),
});

export type TOwner = Static<typeof OwnerSchema>;

export const OwnerSchemaWithoutPassword = Type.Omit(OwnerSchema, ["password"]);
export type TOwnerWithoutPassword = Static<typeof OwnerSchemaWithoutPassword>;

export const OwnerSchemaOut = Type.Intersect([
  OwnerSchemaWithoutPassword,
  Type.Object({
    shops: Type.Optional(Type.Array(ShopSchema)),
    employees: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);

export const OwnerSchemaIn = Type.Omit(OwnerSchema, ["id", "createdAt"]);
export type TOwnerIn = Static<typeof OwnerSchemaIn>;

export const OwnerQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const OwnerQueryStringSchema = Type.Object({
  includeShops: Type.Boolean({ default: false }),
  includeEmployees: Type.Boolean({ default: false }),
});

export type TOwnerQueryParam = Static<typeof OwnerQueryParamSchema>;
export type TOwnerQueryString = Static<typeof OwnerQueryStringSchema>;
