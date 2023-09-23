import { RouteShorthandOptions } from "fastify";
import {
  OrderItemQueryParamSchema,
  OrderItemQueryStringSchema,
  OrderItemSchema,
  OrderItemSchemaIn,
} from "../types/order-item";
import { Type } from "@sinclair/typebox";

export const CreateOrderItemOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order-Item"],
    summary: "Create a new OrderItem",
    body: OrderItemSchemaIn,
    querystring: OrderItemQueryStringSchema,
    response: {
      201: OrderItemSchema,
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
      200: OrderItemSchema,
    },
  },
};

export const QueryOrderItemsByIdOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Order-Item"],
    summary: "Get OrderItems by id",
    params: OrderItemQueryParamSchema,
    querystring: OrderItemQueryStringSchema,
    response: {
      200: Type.Array(OrderItemSchema),
    },
  },
};
