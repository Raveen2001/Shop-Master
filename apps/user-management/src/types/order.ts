import { Static, Type } from "@sinclair/typebox";
import { PagableQuerySchema, PagableSchema } from "./common.js";
import { ORDERS_DB_COLUMNS, ORDER_STATUS, ORDER_TYPES } from "database-drizzle";
import { OwnerSchemaWithoutPassword } from "./owner.js";
import { ShopSchemaOut } from "./shop.js";
import { OrderItemForOrderSchema, OrderItemSchema } from "./order-item.js";
import { CustomerSchema } from "./customer.js";
import { EmployeeSchemaWithoutPassword } from "./employee.js";
import { optionalType } from "./utils.js";

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

  createdAt: Type.String({
    format: "date-time",
  }),
  updatedAt: Type.String({
    format: "date-time",
  }),

  shopId: Type.String(),
  ownerId: Type.String(),
  customerPhone: optionalType(Type.String()),
  createdByEmployeeId: optionalType(Type.String()),
});

export const OrderSchemaIn = Type.Omit(OrderSchema, ["id", "updatedAt"]);

export const PagableOrderSchemaOut = PagableSchema(OrderSchema);

export type TOrderSchema = Static<typeof OrderSchema>;
export type TOrderSchemaIn = Static<typeof OrderSchemaIn>;
export type TOrderSchemaOut = Static<typeof OrderSchema>;

export type TPagableOrderSchemaOut = Static<typeof PagableOrderSchemaOut>;

export const OrderQueryParamSchema = Type.Object({
  id: Type.Integer(),
});

export const OrderQueryStringSchema = Type.Object({});

export const PagableOrderQueryStringSchema = Type.Intersect([
  OrderQueryStringSchema,
  PagableQuerySchema(ORDERS_DB_COLUMNS),
]);

export type TOrderQueryParam = Static<typeof OrderQueryParamSchema>;
export type TOrderQueryString = Static<typeof OrderQueryStringSchema>;
export type TPagableOrderQueryString = Static<
  typeof PagableOrderQueryStringSchema
>;

export type TOrderQueryByFields = "shopId" | "ownerId" | "createdByEmployeeId";
