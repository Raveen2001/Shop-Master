import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { TNewOrderItemDB, orderItemsDB } from "database-drizzle";
import { RouteHandlerMethod } from "fastify";
import {
  CreateOrderItemOpts,
  QueryOrderItemOpts,
  QueryOrderItemsByIdOpts,
} from "../opts/order-item";
import FastifyTypebox from "../types/fastify";
import {
  TOrderItemQueryParam,
  TOrderItemQueryString,
} from "../types/order-item";

const OrderItemRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // create orderItem
  fastify.post<{
    Querystring: TOrderItemQueryString;
    Body: TNewOrderItemDB;
  }>("/create", CreateOrderItemOpts, async (req, reply) => {
    const { includeOrder, includeProductVariant } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(orderItemsDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: orderItemsDB.id })
    )[0];

    const orderItem = await fastify.db.query.orderItemsDB.findFirst({
      where: (orderItemsDB, { eq }) => eq(orderItemsDB.id, insertedId),
      with: {
        order: includeOrder || undefined,
        productVariant: includeProductVariant || undefined,
      },
    });

    reply.code(201).send(orderItem);
  });

  // get orderItem by id
  fastify.get<{
    Params: TOrderItemQueryParam;
    Querystring: TOrderItemQueryString;
  }>("/:id", QueryOrderItemOpts, async (req, reply) => {
    const { includeOrder, includeProductVariant } = req.query;

    const orderItem = await fastify.db.query.orderItemsDB.findFirst({
      where: (orderItemsDB, { eq }) => eq(orderItemsDB.id, req.params.id),

      with: {
        order: includeOrder || undefined,
        productVariant: includeProductVariant || undefined,
      },
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
      const { id } = req.params as TOrderItemQueryParam;
      const { includeOrder, includeProductVariant } =
        req.query as TOrderItemQueryString;

      const orderItems = await fastify.db.query.orderItemsDB.findMany({
        where: (orderItemsDB, { eq }) => eq(orderItemsDB[queryBy], id),
        with: {
          order: includeOrder || undefined,
          productVariant: includeProductVariant || undefined,
        },
      });

      reply.code(200).send(orderItems);
    };
  }

  // get orderItems by order id
  fastify.get<{
    Params: TOrderItemQueryParam;
    Querystring: TOrderItemQueryString;
  }>("/order/:id", QueryOrderItemsByIdOpts, getOrderItemsBy("orderId"));
};

export default OrderItemRoutes;
