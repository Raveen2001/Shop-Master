import { Static, Type } from "@sinclair/typebox";
import { PagableQueryStringSchema, PagableSchema } from "./common";
import { ORDERS_DB_COLUMNS } from "database-drizzle";

export const OrderSchema = Type.Object({
  id: Type.String(),
  paymentType: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  shopId: Type.String(),
  ownerId: Type.String(),
  customerId: Type.String(),
  createdByEmployeeId: Type.String(),
});

export const OrderSchemaIn = Type.Omit(OrderSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const OrderPagableSchema = PagableSchema(OrderSchema);

export type TOrderSchema = Static<typeof OrderSchema>;
export type TOrderSchemaIn = Static<typeof OrderSchemaIn>;
export type TPagableOrderSchema = Static<typeof OrderPagableSchema>;

export const OrderQueryParamSchema = Type.Object({
  id: Type.Integer(),
});

export const OrderQueryStringSchema = Type.Object({
  includeShop: Type.Boolean({ default: false }),
  includeOwner: Type.Boolean({ default: false }),
  includeCustomer: Type.Boolean({ default: false }),
  includeCreatedByEmployee: Type.Boolean({ default: false }),
});

export const PagableOrderQueryStringSchema = PagableQueryStringSchema(
  OrderQueryStringSchema,
  ORDERS_DB_COLUMNS
);

export type TOrderQueryParam = Static<typeof OrderQueryParamSchema>;
export type TOrderQueryString = Static<typeof OrderQueryStringSchema>;
export type TPagableOrderQueryString = Static<
  typeof PagableOrderQueryStringSchema
>;

export type TOrderQueryByFields =
  | "shopId"
  | "customerId"
  | "ownerId"
  | "createdByEmployeeId";
