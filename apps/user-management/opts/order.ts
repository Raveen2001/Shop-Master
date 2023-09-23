import { RouteShorthandOptions } from "fastify";
import {
  OrderQueryParamSchema,
  OrderQueryStringSchema,
  OrderSchema,
  OrderSchemaIn,
  OrderSchemaOut,
  PagableOrderQueryStringSchema,
  PagableOrderSchemaOut,
} from "../types/order";
import { Type } from "@sinclair/typebox";
import { IDStringQueryParamSchema } from "../types/common";

export const CreateOrderOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Create a new Order",
    body: OrderSchemaIn,
    querystring: OrderQueryStringSchema,
    response: {
      201: OrderSchemaOut,
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
      200: OrderSchemaOut,
    },
  },
};

export const QueryOrdersByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Get Orders by id",
    params: IDStringQueryParamSchema,
    querystring: OrderQueryStringSchema,
    response: {
      200: Type.Array(OrderSchemaOut),
    },
  },
};

export const QueryPagedOrdersByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Get Paged Orders by id",
    params: IDStringQueryParamSchema,
    querystring: PagableOrderQueryStringSchema,
    response: {
      200: PagableOrderSchemaOut,
    },
  },
};
