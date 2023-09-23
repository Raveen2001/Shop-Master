import { RouteShorthandOptions } from "fastify";
import {
  OrderQueryParamSchema,
  OrderQueryStringSchema,
  OrderSchema,
  OrderSchemaIn,
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

export const QueryOrdersByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order"],
    summary: "Get Orders by id",
    params: IDStringQueryParamSchema,
    querystring: OrderQueryStringSchema,
    response: {
      200: Type.Array(OrderSchema),
    },
  },
};
