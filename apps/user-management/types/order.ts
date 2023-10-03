import { Static, Type } from "@sinclair/typebox";
import { PagableQueryStringSchema, PagableSchema } from "./common";
import { ORDERS_DB_COLUMNS, ORDER_STATUS, ORDER_TYPES } from "database-drizzle";
import { OwnerSchemaWithoutPassword } from "./owner";
import { ShopSchemaOut } from "./shop";
import { OrderItemForOrderSchema, OrderItemSchema } from "./order-item";
import { CustomerSchema } from "./customer";
import { EmployeeSchemaWithoutPassword } from "./employee";

export const OrderSchema = Type.Object({
  id: Type.String(),

  type: Type.Union(ORDER_TYPES.map((col) => Type.Literal(col))),
  status: Type.Union(ORDER_STATUS.map((col) => Type.Literal(col))),

  items: Type.Array(OrderItemForOrderSchema),

  tax: Type.Number(),
  delivery: Type.Number(),
  discount: Type.Number(),
  subTotal: Type.Number(),
  total: Type.Number(),

  createdAt: Type.String(),
  updatedAt: Type.String(),
  shopId: Type.String(),
  ownerId: Type.String(),
  customerPhone: Type.String(),
  createdByEmployeeId: Type.String(),
});

export const OrderSchemaIn = Type.Omit(OrderSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const OrderSchemaOut = Type.Intersect([
  OrderSchema,
  Type.Object({
    shop: Type.Optional(ShopSchemaOut),
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    customer: Type.Optional(CustomerSchema),
    createdByEmployee: Type.Optional(EmployeeSchemaWithoutPassword),
    items: Type.Optional(Type.Array(OrderItemSchema)),
  }),
]);

export const PagableOrderSchemaOut = PagableSchema(OrderSchemaOut);

export type TOrderSchema = Static<typeof OrderSchema>;
export type TOrderSchemaIn = Static<typeof OrderSchemaIn>;
export type TOrderSchemaOut = Static<typeof OrderSchemaOut>;

export type TPagableOrderSchemaOut = Static<typeof PagableOrderSchemaOut>;

export const OrderQueryParamSchema = Type.Object({
  id: Type.Integer(),
});

export const OrderQueryStringSchema = Type.Object({
  includeShop: Type.Boolean({ default: false }),
  includeOwner: Type.Boolean({ default: false }),
  includeCustomer: Type.Boolean({ default: false }),
  includeCreatedByEmployee: Type.Boolean({ default: false }),
  includeItems: Type.Boolean({ default: false }),
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

export type TOrderQueryByFields = "shopId" | "ownerId" | "createdByEmployeeId";
