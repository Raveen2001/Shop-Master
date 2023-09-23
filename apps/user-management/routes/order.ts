import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { TNewOrderDB, ordersDB } from "database-drizzle";
import { RouteHandlerMethod } from "fastify";
import {
  CreateOrderOpts,
  QueryOrderOpts,
  QueryOrdersByIdOpts,
  QueryPagedOrdersByIdOpts,
} from "../opts/order";
import FastifyTypebox from "../types/fastify";
import {
  TOrderQueryByFields,
  TOrderQueryParam,
  TOrderQueryString,
  TPagableOrderQueryString,
} from "../types/order";
import { TIDStringQueryParam } from "../types/common";

const OrderRoutes: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypebox
) => {
  // create order
  fastify.post<{
    Querystring: TOrderQueryString;
    Body: TNewOrderDB;
  }>("/create", CreateOrderOpts, async (req, reply) => {
    const {
      includeCreatedByEmployee,
      includeCustomer,
      includeOwner,
      includeShop,
    } = req.query;
    const { insertedId } = (
      await fastify.db
        .insert(ordersDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({ insertedId: ordersDB.id })
    )[0];

    const order = await fastify.db.query.ordersDB.findFirst({
      where: (ordersDB, { eq }) => eq(ordersDB.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        customer: includeCustomer || undefined,
        createdByEmployee: includeCreatedByEmployee || undefined,
      },
    });

    reply.code(201).send(order);
  });

  // get order by id
  fastify.get<{
    Params: TOrderQueryParam;
    Querystring: TOrderQueryString;
  }>("/:id", QueryOrderOpts, async (req, reply) => {
    const {
      includeCreatedByEmployee,
      includeCustomer,
      includeOwner,
      includeShop,
    } = req.query;

    const order = await fastify.db.query.ordersDB.findFirst({
      where: (ordersDB, { eq }) => eq(ordersDB.id, req.params.id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        customer: includeCustomer || undefined,
        createdByEmployee: includeCreatedByEmployee || undefined,
      },
    });

    if (!order) {
      reply.code(404).send({ message: "Order not found" });
      return;
    }

    reply.code(200).send(order);
  });

  // query orders by
  function getOrdersBy(queryBy: TOrderQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TIDStringQueryParam;
      const {
        includeCreatedByEmployee,
        includeCustomer,
        includeOwner,
        includeShop,
      } = req.query as TOrderQueryString;

      const orders = await fastify.db.query.ordersDB.findMany({
        where: (ordersDB, { eq }) => eq(ordersDB[queryBy], id),
        with: {
          owner: includeOwner || undefined,
          shop: includeShop || undefined,
          customer: includeCustomer || undefined,
          createdByEmployee: includeCreatedByEmployee || undefined,
        },
      });

      reply.code(200).send(orders);
    };
  }

  // get orders by shop id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TOrderQueryString;
  }>("/shop/:id", QueryOrdersByIdOpts, getOrdersBy("shopId"));

  // get orders by customer id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TOrderQueryString;
  }>("/customer/:id", QueryOrdersByIdOpts, getOrdersBy("customerId"));

  // get orders by owner id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TOrderQueryString;
  }>("/owner/:id", QueryOrdersByIdOpts, getOrdersBy("ownerId"));

  // get orders by created by employee id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TOrderQueryString;
  }>("/created-by-employee/:id", QueryOrdersByIdOpts, getOrdersBy("ownerId"));

  // query orders by
  function getPagedOrdersBy(queryBy: TOrderQueryByFields): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TIDStringQueryParam;
      const {
        includeCreatedByEmployee,
        includeCustomer,
        includeOwner,
        includeShop,
        limit,
        order,
        orderBy,
        page,
      } = req.query as TPagableOrderQueryString;

      const offset =
        page !== undefined && limit !== undefined ? page * limit : undefined;

      const orders = await fastify.db.query.ordersDB.findMany({
        where: (ordersDB, { eq }) => eq(ordersDB[queryBy], id),
        with: {
          owner: includeOwner || undefined,
          shop: includeShop || undefined,
          customer: includeCustomer || undefined,
          createdByEmployee: includeCreatedByEmployee || undefined,
        },
        limit: limit,
        offset: offset,
        orderBy: (ordersDB, { asc, desc }) => {
          if (orderBy && order == "asc") {
            return asc(ordersDB[orderBy]);
          } else if (orderBy && order == "desc") {
            return desc(ordersDB[orderBy]);
          }
          return asc(ordersDB.createdAt);
        },
      });

      reply.code(200).send(orders);
    };
  }

  // get paged orders by shop id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TPagableOrderQueryString;
  }>("/shop/:id/paged", QueryPagedOrdersByIdOpts, getPagedOrdersBy("shopId"));

  // get paged orders by customer id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TPagableOrderQueryString;
  }>(
    "/customer/:id/paged",
    QueryPagedOrdersByIdOpts,
    getPagedOrdersBy("customerId")
  );

  // get paged orders by owner id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TPagableOrderQueryString;
  }>("/owner/:id/paged", QueryPagedOrdersByIdOpts, getPagedOrdersBy("ownerId"));

  // get paged orders by created by employee id
  fastify.get<{
    Params: TIDStringQueryParam;
    Querystring: TPagableOrderQueryString;
  }>(
    "/created-by-employee/:id/paged",
    QueryPagedOrdersByIdOpts,
    getPagedOrdersBy("ownerId")
  );
};

export default OrderRoutes;
