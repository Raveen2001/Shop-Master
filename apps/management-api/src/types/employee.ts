import { EMPLOYEE_DB_COLUMNS, EMPLOYEE_TYPES } from "database-drizzle";
import { Static, Type } from "@sinclair/typebox";
import { PagableQuerySchema, PagableSchema } from "./common.js";
import { optionalType } from "./utils.js";

export const EmployeeSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3 }),
  type: Type.Union(EMPLOYEE_TYPES.map((key) => Type.Literal(key))),
  username: Type.String({ minLength: 3, maxLength: 100 }),
  password: Type.String({ minLength: 8 }),
  email: optionalType(Type.String({ format: "email" })),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  image: optionalType(Type.String({ format: "uri" })),
  address: Type.String({ minLength: 3 }),

  shopId: Type.String(),
  ownerId: Type.String(),

  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const EmployeeSchemaWithoutPassword = Type.Omit(EmployeeSchema, [
  "password",
]);

export type TEmployeeWithPassword = Static<typeof EmployeeSchema>;

export const EmployeeSchemaIn = Type.Omit(EmployeeSchema, [
  "id",
  "ownerId",
  "createdAt",
  "updatedAt",
]);
export const EmployeeSchemaOut = EmployeeSchemaWithoutPassword;

export const PagableEmployeeSchemaOut = PagableSchema(EmployeeSchemaOut);

export type TEmployeeIn = Static<typeof EmployeeSchemaIn>;
export type TPagedEmployeeOut = Static<typeof PagableEmployeeSchemaOut>;

export const EmployeeQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const PagableEmployeeQueryStringSchema =
  PagableQuerySchema(EMPLOYEE_DB_COLUMNS);

export type TEmployeeQueryParam = Static<typeof EmployeeQueryParamSchema>;
export type TPagableEmployeeQueryString = Static<
  typeof PagableEmployeeQueryStringSchema
>;

export type TEmployeeQueryByFields = "shopId" | "ownerId";
