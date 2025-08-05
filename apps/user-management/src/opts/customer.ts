import { RouteShorthandOptions } from "fastify";
import {
  CustomerQueryParamSchema,
  CustomerQueryStringSchema,
  CustomerSchemaOut,
  PagableCustomerQueryStringSchema,
  PagableCustomerSchemaOut,
  CustomerSchemaIn,
  CustomerQueryParamIDSchema,
  TCustomerQueryByFields,
} from "../types/customer.js";
import { Type } from "@sinclair/typebox";

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

export const getOptsForQueryCustomerBy = (by: TCustomerQueryByFields) => {
  return {
    schema: {
      tags: ["Customer"],
      summary: `Get customers by ${by}`,
      params: CustomerQueryParamIDSchema,
      querystring: CustomerQueryStringSchema,
      response: {
        200: Type.Array(CustomerSchemaOut),
      },
    },
  };
};

export const getOptsForQueryPagedCustomerBy = (by: TCustomerQueryByFields) => {
  return {
    schema: {
      tags: ["Customer"],
      summary: `Get customers by ${by}`,
      params: CustomerQueryParamIDSchema,
      querystring: PagableCustomerQueryStringSchema,
      response: {
        200: PagableCustomerSchemaOut,
      },
    },
  };
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
