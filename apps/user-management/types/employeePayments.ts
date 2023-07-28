import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { PagableQueryStringSchema, PagableSchema } from "./common";
import {
  EMPLOYEE_PAYEMENT_DB_COLUMNS,
  EMPLOYEE_PAYEMENT_TYPES,
} from "database-drizzle/schema/employeePayments";

export const EmployeePaymentSchema = Type.Object({
  id: Type.String(),
  type: Type.Union(EMPLOYEE_PAYEMENT_TYPES.map((key) => Type.Literal(key))),
  amount: Type.Number({ minimum: 1 }),
  comment: Type.Optional(Type.String({ minLength: 3 })),
  createdAt: Type.String(),
  createdByEmployeeId: Type.String(),
  employeeId: Type.String(),
  shopId: Type.String(),
  ownerId: Type.String(),
});

export const EmployeePaymentSchemaIn = Type.Omit(EmployeePaymentSchema, ["id"]);
export const PagableEmployeePaymentsSchemaOut = PagableSchema(
  EmployeePaymentSchema
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

export const QueryEmployeePaymentsOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get a employee by employee_id",
    params: EmployeePaymentsQueryParamSchema,
    querystring: PagableEmployeePaymentsQueryStringSchema,
    response: {
      200: PagableEmployeePaymentsSchemaOut,
    },
  },
};

export const QueryEmployeesPaymentsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
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
    tags: ["Employee"],
    summary: "Create a new employee payment",
    body: EmployeePaymentSchemaIn,
    response: {
      201: EmployeePaymentSchema,
    },
  },
};
