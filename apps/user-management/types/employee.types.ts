import { EMPLOYEE_DB_COLUMNS } from "database-drizzle/schema/employees";
import { EMPLOYEE_TYPES } from "database-drizzle";
import { Static, Type } from "@sinclair/typebox";
import { OwnerSchemaWithoutPassword } from "./owner.types";
import { ShopSchema } from "./shop.types";
import { PagableQueryStringSchema, PagableSchema } from "./common.types";

export const EmployeeSchema = Type.Object({
  id: Type.String(),
  username: Type.String({ minLength: 3, maxLength: 100 }),
  name: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 8 }),
  email: Type.Optional(Type.String({ format: "email" })),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  image: Type.Union([Type.String({ format: "uri" }), Type.Null()]),
  address: Type.String({ minLength: 3 }),
  createdAt: Type.String({ format: "date-time" }),
  type: Type.Union(EMPLOYEE_TYPES.map((key) => Type.Literal(key))),
  shopId: Type.String(),
  ownerId: Type.String(),
});

export const EmployeeSchemaWithoutPassword = Type.Omit(EmployeeSchema, [
  "password",
]);

export const EmployeeSchemaIn = Type.Omit(EmployeeSchema, ["id", "createdAt"]);
export const EmployeeSchemaOut = Type.Intersect([
  EmployeeSchemaWithoutPassword,
  Type.Object({
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    shop: Type.Optional(ShopSchema),
  }),
]);

export const PagableEmployeeSchemaOut = PagableSchema(EmployeeSchemaOut);

export type TEmployeeIn = Static<typeof EmployeeSchemaIn>;
export type TPagedEmployeeOut = Static<typeof PagableEmployeeSchemaOut>;

export const EmployeeQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const EmployeeQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
});

export const PagableEmployeeQueryStringSchema = PagableQueryStringSchema(
  EmployeeQueryStringSchema,
  EMPLOYEE_DB_COLUMNS
);

export type TEmployeeQueryParam = Static<typeof EmployeeQueryParamSchema>;
export type TEmployeeQueryString = Static<typeof EmployeeQueryStringSchema>;
export type TPagableEmployeeQueryString = Static<
  typeof PagableEmployeeQueryStringSchema
>;
