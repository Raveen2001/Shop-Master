import { RouteShorthandOptions } from "fastify";
import {
  OrderQueryParamSchema,
  OrderQueryStringSchema,
  OrderSchema,
  OrderSchemaIn,
  PagableOrderQueryStringSchema,
  PagableOrderSchemaOut,
  TOrderQueryByFields,
} from "../types/order.js";
import { Type } from "@sinclair/typebox";
import {
  PhoneQueryParamSchema,
  IDStringQueryParamSchema,
} from "../types/common.js";

export const CreateOrderOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Create a new Order",
    body: OrderSchemaIn,
    querystring: OrderQueryStringSchema,
    response: {
      201: OrderSchema,
    },
  },
};

export const QueryOrderOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Get Order by order_id",
    params: OrderQueryParamSchema,
    querystring: OrderQueryStringSchema,
    response: {
      200: OrderSchema,
    },
  },
};

export const getOptsForQueryOrderBy = (by: TOrderQueryByFields) => {
  return {
    schema: {
      tags: ["Order"],
      summary: `Get Orders by ${by}`,
      params: IDStringQueryParamSchema,
      querystring: OrderQueryStringSchema,
      response: {
        200: Type.Array(OrderSchema),
      },
    },
  };
};

export const getOptsForQueryPagedOrderBy = (by: TOrderQueryByFields) => {
  return {
    schema: {
      tags: ["Order"],
      summary: `Get Paged Orders by ${by}`,
      params: IDStringQueryParamSchema,
      querystring: PagableOrderQueryStringSchema,
      response: {
        200: PagableOrderSchemaOut,
      },
    },
  };
};

export const QueryOrdersByPhoneOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Get Orders by customer phone",
    params: PhoneQueryParamSchema,
    querystring: OrderQueryStringSchema,
    response: {
      200: Type.Array(OrderSchema),
    },
  },
};

export const QueryPagedOrdersByPhoneOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Get Paged Orders by customer phone",
    params: PhoneQueryParamSchema,
    querystring: PagableOrderQueryStringSchema,
    response: {
      200: PagableOrderSchemaOut,
    },
  },
};
