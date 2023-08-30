import { Static, Type } from "@sinclair/typebox";
import { PagableQueryStringSchema, PagableSchema } from "./common";
import {
  EMPLOYEE_PAYEMENT_DB_COLUMNS,
  EMPLOYEE_PAYEMENT_TYPES,
} from "database-drizzle/schema/employee_payments";
import { EmployeeSchemaWithoutPassword } from "./employee";
import { OwnerSchemaWithoutPassword } from "./owner";
import { ShopSchema } from "./shop";

export const EmployeePaymentSchema = Type.Object({
  id: Type.String(),
  type: Type.Union(EMPLOYEE_PAYEMENT_TYPES.map((key) => Type.Literal(key))),
  amount: Type.Number({ minimum: 1 }),
  comment: Type.Optional(Type.String()),
  createdAt: Type.String({
    format: "date-time",
  }),
  createdByEmployeeId: Type.Union([
    Type.String({ format: "uri" }),
    Type.Null(),
  ]),
  employeeId: Type.String(),
  shopId: Type.String(),
  ownerId: Type.String(),
});

export const EmployeePaymentSchemaIn = Type.Omit(EmployeePaymentSchema, ["id"]);
export const EmployeePaymentSchemaOut = Type.Intersect([
  EmployeePaymentSchema,
  Type.Object({
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    shop: Type.Optional(ShopSchema),
    employee: Type.Optional(EmployeeSchemaWithoutPassword),
    createdByEmployee: Type.Optional(
      Type.Union([EmployeeSchemaWithoutPassword, Type.Null()])
    ),
  }),
]);
export const PagableEmployeePaymentsSchemaOut = PagableSchema(
  EmployeePaymentSchemaOut
);

export type TEmployeePaymentIn = Static<typeof EmployeePaymentSchemaIn>;
export type TPagedEmployeePaymentOut = Static<
  typeof PagableEmployeePaymentsSchemaOut
>;

export const EmployeePaymentsQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const EmployeePaymentQueryStringSchema = Type.Object({
  includeEmployee: Type.Boolean({ default: false }),
  includeCreatedByEmployee: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeOwner: Type.Boolean({ default: false }),
});

export const PagableEmployeePaymentsQueryStringSchema =
  PagableQueryStringSchema(
    EmployeePaymentQueryStringSchema,
    EMPLOYEE_PAYEMENT_DB_COLUMNS
  );

export type TEmployeePaymentQueryParam = Static<
  typeof EmployeePaymentsQueryParamSchema
>;

export type TPagableEmployeePaymentQueryString = Static<
  typeof PagableEmployeePaymentsQueryStringSchema
>;
