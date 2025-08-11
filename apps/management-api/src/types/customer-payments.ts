import { Static, Type } from "@sinclair/typebox";
import { PagableQuerySchema, PagableSchema } from "./common.js";
import {
  CUSTOMER_PAYEMENT_DB_COLUMNS,
  CUSTOMER_PAYEMENT_TYPES,
} from "database-drizzle";
import { EmployeeSchemaWithoutPassword } from "./employee.js";
import { OwnerSchemaWithoutPassword } from "./owner.js";
import { ShopSchema } from "./shop.js";
import { CustomerSchemaOut } from "./customer.js";
import { optionalType } from "./utils.js";

export const CustomerPaymentSchema = Type.Object({
  id: Type.String(),
  type: Type.Union(CUSTOMER_PAYEMENT_TYPES.map((key) => Type.Literal(key))),
  amount: Type.Number({ minimum: 1 }),
  comment: optionalType(Type.String()),
  createdAt: Type.String({
    format: "date-time",
  }),
  updatedAt: Type.String({
    format: "date-time",
  }),
  createdByEmployeeId: optionalType(Type.String()),
  customerPhone: Type.String(),
  shopId: Type.String(),
  ownerId: Type.String(),
});

export const CustomerPaymentSchemaIn = Type.Omit(CustomerPaymentSchema, [
  "id",
  "updatedAt",
]);

export const CustomerPaymentSchemaOut = Type.Intersect([
  CustomerPaymentSchema,
  Type.Object({
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    shop: Type.Optional(ShopSchema),
    customer: Type.Optional(CustomerSchemaOut),
    createdByEmployee: optionalType(EmployeeSchemaWithoutPassword),
  }),
]);
export const PagableCustomerPaymentsSchemaOut = PagableSchema(
  CustomerPaymentSchemaOut
);

export type TCustomerPaymentIn = Static<typeof CustomerPaymentSchemaIn>;
export type TPagedCustomerPaymentOut = Static<
  typeof PagableCustomerPaymentsSchemaOut
>;

export const CustomerPaymentsQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const CustomerPaymentQueryStringSchema = Type.Object({
  includeCustomer: Type.Boolean({ default: false }),
  includeCreatedByEmployee: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeOwner: Type.Boolean({ default: false }),
});

export const PagableCustomerPaymentsQueryStringSchema = Type.Intersect([
  CustomerPaymentQueryStringSchema,
  PagableQuerySchema(CUSTOMER_PAYEMENT_DB_COLUMNS),
]);

export type TCustomerPaymentQueryParam = Static<
  typeof CustomerPaymentsQueryParamSchema
>;

export type TPagableCustomerPaymentQueryString = Static<
  typeof PagableCustomerPaymentsQueryStringSchema
>;
