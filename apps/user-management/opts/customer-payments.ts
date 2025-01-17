import { RouteShorthandOptions } from "fastify";
import {
  CustomerPaymentsQueryParamSchema,
  PagableCustomerPaymentsQueryStringSchema,
  PagableCustomerPaymentsSchemaOut,
  CustomerPaymentSchemaIn,
  CustomerPaymentSchema,
} from "../types/customer-payments";
import { PhoneQueryParamSchema } from "../types/common";

export const QueryCustomersPaymentsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer-Payments"],
    summary: "Get all customers payments by id",
    params: CustomerPaymentsQueryParamSchema,
    querystring: PagableCustomerPaymentsQueryStringSchema,
    response: {
      200: PagableCustomerPaymentsSchemaOut,
    },
  },
};

export const QueryCustomersPaymentsByPhoneOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer-Payments"],
    summary: "Get all customers payments by phone",
    params: PhoneQueryParamSchema,
    querystring: PagableCustomerPaymentsQueryStringSchema,
    response: {
      200: PagableCustomerPaymentsSchemaOut,
    },
  },
};

export const CreateCustomerPaymentOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer-Payments"],
    summary: "Create a new customer payment",
    body: CustomerPaymentSchemaIn,
    response: {
      201: CustomerPaymentSchema,
    },
  },
};
