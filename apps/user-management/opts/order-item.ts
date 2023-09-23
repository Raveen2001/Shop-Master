import { RouteShorthandOptions } from "fastify";
import {
  OrderItemQueryParamSchema,
  OrderItemQueryStringSchema,
  OrderItemSchemaIn,
  OrderItemSchemaOut,
} from "../types/order-item";
import { Type } from "@sinclair/typebox";
import { IDNumberQueryParamSchema } from "../types/common";

export const CreateOrderItemOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order-Item"],
    summary: "Create a new OrderItem",
    body: OrderItemSchemaIn,
    querystring: OrderItemQueryStringSchema,
    response: {
      201: OrderItemSchemaOut,
    },
  },
};

export const QueryOrderItemOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order-Item"],
    summary: "Get OrderItem by order_item_id",
    params: OrderItemQueryParamSchema,
    querystring: OrderItemQueryStringSchema,
    response: {
      200: OrderItemSchemaOut,
    },
  },
};

export const QueryOrderItemsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order-Item"],
    summary: "Get OrderItems by id",
    params: IDNumberQueryParamSchema,
    querystring: OrderItemQueryStringSchema,
    response: {
      200: Type.Array(OrderItemSchemaOut),
    },
  },
};
