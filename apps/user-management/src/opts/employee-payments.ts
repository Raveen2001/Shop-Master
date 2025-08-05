import { RouteShorthandOptions } from "fastify";
import {
  EmployeePaymentsQueryParamSchema,
  PagableEmployeePaymentsQueryStringSchema,
  PagableEmployeePaymentsSchemaOut,
  EmployeePaymentSchemaIn,
  EmployeePaymentSchema,
} from "../types/employee-payments.js";

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
