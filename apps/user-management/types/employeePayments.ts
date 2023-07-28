import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { PagableQueryStringSchema, PagableSchema } from "./common";
import {
  EMPLOYEE_PAYEMENT_DB_COLUMNS,
  EMPLOYEE_PAYEMENT_TYPES,
} from "database-drizzle/schema/employeePayments";
import { EmployeeSchemaWithoutPassword } from "./employee";
import { OwnerSchemaWithoutPassword } from "./owner";
import { ShopSchema } from "./shop";

export const EmployeePaymentSchema = Type.Object({
  id: Type.String(),
  type: Type.Union(EMPLOYEE_PAYEMENT_TYPES.map((key) => Type.Literal(key))),
  amount: Type.Number({ minimum: 1 }),
  comment: Type.Optional(Type.String({ minLength: 3 })),
  createdAt: Type.String({
    format: "date-time",
  }),
  createdByEmployeeId: Type.String(),
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
    createdByEmployee: Type.Optional(EmployeeSchemaWithoutPassword),
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
export const QueryEmployeesPaymentsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee-Payments"],
    summary: "Get all employees payments by id",
    params: EmployeePaymentsQueryParamSchema,
    querystring: PagableEmployeePaymentsQueryStringSchema,
    response: {
      200: PagableEmployeePaymentsSchemaOut,
    },
  },
};

export const CreateEmployeePaymentOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee-Payments"],
    summary: "Create a new employee payment",
    body: EmployeePaymentSchemaIn,
    response: {
      201: EmployeePaymentSchema,
    },
  },
};
