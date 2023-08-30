import {
  sql,
  eq,
  TCUSTOMER_PAYMENT_QUERY_BY_FIELDS,
  customerPaymentsDB,
} from "database-drizzle";
import {
  TCustomerPaymentIn,
  TCustomerPaymentQueryParam,
  TPagableCustomerPaymentQueryString,
} from "../types/customer-payments";

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { RouteHandlerMethod } from "fastify";
import {
  CreateCustomerPaymentOpts,
  QueryCustomersPaymentsByIdOpts,
} from "../opts/customer-payments";

const CustomerPaymentRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // create customer payment
  fastify.post<{
    Body: TCustomerPaymentIn;
  }>("/create", CreateCustomerPaymentOpts, async (req, reply) => {
    const data = {
      ...req.body,
      createdAt: new Date(req.body.createdAt),
      updatedAt: new Date(req.body.createdAt),
    };

    const customerPayment = (
      await fastify.db.insert(customerPaymentsDB).values(data).returning()
    ).at(0);

    reply.code(201).send(customerPayment);
  });

  function queryCustomerPaymentsBy(
    queryBy: TCUSTOMER_PAYMENT_QUERY_BY_FIELDS
  ): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TCustomerPaymentQueryParam;
      const {
        includeCreatedByEmployee,
        includeCustomer,
        includeOwner,
        includeShop,
        limit,
        page,
        order,
        orderBy,
      } = req.query as TPagableCustomerPaymentQueryString;

      const offset =
        page !== undefined && limit !== undefined ? page * limit : undefined;

      const customerPayments =
        await fastify.db.query.customerPaymentsDB.findMany({
          where: (customerPaymentsDB, { eq }) =>
            eq(customerPaymentsDB[queryBy], id),

          with: {
            createdByEmployee: includeCreatedByEmployee || undefined,
            customer: includeCustomer || undefined,
            owner: includeOwner || undefined,
            shop: includeShop || undefined,
          },
          limit: limit,
          offset: offset,
          orderBy: (customerPaymentsDB, { asc, desc }) => {
            if (orderBy && order == "asc") {
              return asc(customerPaymentsDB[orderBy]);
            } else if (orderBy && order == "desc") {
              return desc(customerPaymentsDB[orderBy]);
            }
            return asc(customerPaymentsDB.createdAt);
          },
        });

      const { total } = (
        await fastify.db
          .select({
            total: sql<number>`count(*)`.mapWith(Number),
          })
          .from(customerPaymentsDB)
          .where(eq(customerPaymentsDB[queryBy], id))
      )[0];

      const result = { rows: customerPayments, total, page, limit };

      reply.code(200).send(result);
    };
  }

  // query customers payments by owner id
  fastify.get<{
    Querystring: TPagableCustomerPaymentQueryString;
    Params: TCustomerPaymentQueryParam;
  }>(
    "/owner/:id",
    QueryCustomersPaymentsByIdOpts,
    queryCustomerPaymentsBy("ownerId")
  );

  // query customers payments by shop id
  fastify.get<{
    Querystring: TPagableCustomerPaymentQueryString;
    Params: TCustomerPaymentQueryParam;
  }>(
    "/shop/:id",
    QueryCustomersPaymentsByIdOpts,
    queryCustomerPaymentsBy("shopId")
  );

  // query customers payments by employee id
  fastify.get<{
    Querystring: TPagableCustomerPaymentQueryString;
    Params: TCustomerPaymentQueryParam;
  }>(
    "/customer/:id",
    QueryCustomersPaymentsByIdOpts,
    queryCustomerPaymentsBy("customerId")
  );

  // query customers payments by created by employee id
  fastify.get<{
    Querystring: TPagableCustomerPaymentQueryString;
    Params: TCustomerPaymentQueryParam;
  }>(
    "/createdByEmployee/:id",
    QueryCustomersPaymentsByIdOpts,
    queryCustomerPaymentsBy("createdByEmployeeId")
  );
};

export default CustomerPaymentRoutes;
