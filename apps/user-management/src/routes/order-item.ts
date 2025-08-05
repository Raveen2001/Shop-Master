import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { TNewOrderItemDB, orderItemsDB } from "database-drizzle";
import { RouteHandlerMethod } from "fastify";
import {
  CreateOrderItemOpts,
  QueryOrderItemOpts,
  QueryOrderItemsByIdOpts,
} from "../opts/order-item.js";
import FastifyTypebox from "../types/fastify.js";
import {
  TOrderItemQueryParam,
  TOrderItemQueryString,
} from "../types/order-item.js";
import { TIDNumberQueryParam } from "../types/common.js";

const OrderItemRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // create orderItem
  fastify.post<{
    Querystring: TOrderItemQueryString;
    Body: TNewOrderItemDB;
  }>("/create", CreateOrderItemOpts, async (req, reply) => {
    const { insertedId } = (
      await fastify.db
        .insert(orderItemsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: orderItemsDB.id })
    )[0];

    const orderItem = await fastify.db.query.orderItemsDB.findFirst({
      where: (orderItemsDB, { eq }) => eq(orderItemsDB.id, insertedId),
    });

    reply.code(201).send(orderItem);
  });

  // get orderItem by id
  fastify.get<{
    Params: TOrderItemQueryParam;
    Querystring: TOrderItemQueryString;
  }>("/:id", QueryOrderItemOpts, async (req, reply) => {
    const orderItem = await fastify.db.query.orderItemsDB.findFirst({
      where: (orderItemsDB, { eq }) => eq(orderItemsDB.id, req.params.id),
    });

    if (!orderItem) {
      reply.code(404).send({ message: "OrderItem not found" });
      return;
    }

    reply.code(200).send(orderItem);
  });

  // query orderItems by
  function getOrderItemsBy(queryBy: "orderId"): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TIDNumberQueryParam;
      const { includeProductVariant } = req.query as TOrderItemQueryString;

      const orderItems = await fastify.db.query.orderItemsDB.findMany({
        where: (orderItemsDB, { eq }) => eq(orderItemsDB[queryBy], id),
        with: {
          productVariant: includeProductVariant || undefined,
        },
      });

      reply.code(200).send(orderItems);
    };
  }

  // get orderItems by order id
  fastify.get<{
    Params: TIDNumberQueryParam;
    Querystring: TOrderItemQueryString;
  }>("/order/:id", QueryOrderItemsByIdOpts, getOrderItemsBy("orderId"));
};

export default OrderItemRoutes;
