import { RouteShorthandOptions } from "fastify";
import {
  CustomerQueryParamSchema,
  CustomerQueryStringSchema,
  CustomerSchemaOut,
  PagableCustomerQueryStringSchema,
  PagableCustomerSchemaOut,
  CustomerSchemaIn,
  CustomerQueryParamIDSchema,
} from "../types/customer";

export const QueryCustomerByPhoneOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer"],
    summary: "Get a customer by phone",
    params: CustomerQueryParamSchema,
    querystring: CustomerQueryStringSchema,
    response: {
      200: CustomerSchemaOut,
    },
  },
};

export const QueryCustomersByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer"],
    summary: "Get all customers by owner_id",
    params: CustomerQueryParamIDSchema,
    querystring: PagableCustomerQueryStringSchema,
    response: {
      200: PagableCustomerSchemaOut,
    },
  },
};

export const QueryCustomersByShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer"],
    summary: "Get all customers by shop_id",
    params: CustomerQueryParamIDSchema,
    querystring: PagableCustomerQueryStringSchema,
    response: {
      200: PagableCustomerSchemaOut,
    },
  },
};

export const QueryCustomersByCreatedEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer"],
    summary: "Get all customers by created_by_employee_id",
    params: CustomerQueryParamIDSchema,
    querystring: PagableCustomerQueryStringSchema,
    response: {
      200: PagableCustomerSchemaOut,
    },
  },
};

export const CreateCustomerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Customer"],
    summary: "Create a new customer",
    body: CustomerSchemaIn,
    response: {
      201: CustomerSchemaOut,
    },
  },
};
