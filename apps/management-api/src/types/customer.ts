import { CUSTOMER_DB_COLUMNS, CUSTOMER_TYPES } from "database-drizzle";
import { Static, Type } from "@sinclair/typebox";
import { OwnerSchemaWithoutPassword } from "./owner.js";
import { ShopSchema } from "./shop.js";
import { PagableQuerySchema, PagableSchema } from "./common.js";
import { optionalType } from "./utils.js";
import { EmployeeSchemaWithoutPassword } from "./employee.js";

export const CustomerSchema = Type.Object({
  name: Type.String({ minLength: 3 }),
  type: Type.Union(CUSTOMER_TYPES.map((key) => Type.Literal(key))),
  email: optionalType(Type.String({ format: "email" })),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  image: optionalType(Type.String({ format: "uri" })),
  address: Type.String({ minLength: 3 }),

  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),

  shopId: Type.String(),
  ownerId: Type.String(),
  createdByEmployeeId: optionalType(Type.String({ format: "uuid" })),
});

export const CustomerSchemaIn = Type.Omit(CustomerSchema, [
  "createdAt",
  "updatedAt",
]);
export const CustomerSchemaOut = Type.Intersect([
  CustomerSchema,
  Type.Object({
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    shop: Type.Optional(ShopSchema),
    createdByEmployee: optionalType(EmployeeSchemaWithoutPassword),
  }),
]);

export const PagableCustomerSchemaOut = PagableSchema(CustomerSchemaOut);

export type TCustomerIn = Static<typeof CustomerSchemaIn>;
export type TPagedCustomerOut = Static<typeof PagableCustomerSchemaOut>;

export const CustomerQueryParamSchema = Type.Object({
  phone: Type.String(),
});

export const CustomerQueryParamIDSchema = Type.Object({
  id: Type.String(),
});

export const CustomerQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeCreatedByEmployee: Type.Boolean({ default: false }),
});

export const PagableCustomerQueryStringSchema = Type.Intersect([
  CustomerQueryStringSchema,
  PagableQuerySchema(CUSTOMER_DB_COLUMNS),
]);

export type TCustomerQueryParam = Static<typeof CustomerQueryParamSchema>;
export type TCustomerQueryParamID = Static<typeof CustomerQueryParamIDSchema>;
export type TCustomerQueryString = Static<typeof CustomerQueryStringSchema>;
export type TPagableCustomerQueryString = Static<
  typeof PagableCustomerQueryStringSchema
>;

export type TCustomerQueryByFields =
  | "shopId"
  | "ownerId"
  | "createdByEmployeeId";
