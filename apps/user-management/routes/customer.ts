import { customersDB, eq, sql } from "database-drizzle";
import {
  TCustomerIn,
  TCustomerQueryByFields,
  TCustomerQueryParam,
  TCustomerQueryString,
  TPagableCustomerQueryString,
} from "../types/customer";

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { RouteHandlerMethod } from "fastify";
import {
  CreateCustomerOpts,
  QueryCustomerByIdOpts,
  QueryCustomersByShopOpts,
  QueryCustomersByOwnerOpts,
} from "../opts/customer";

export const CustomerRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // create customer
  fastify.post<{
    Querystring: TCustomerQueryString;
    Body: TCustomerIn;
  }>("/create", CreateCustomerOpts, async (req, reply) => {
    const { includeOwner, includeShop, includeCreatedByEmployee } = req.query;

    // check if the customer username already exists
    const existingCustomer = await fastify.db.query.customersDB.findFirst({
      where: (customersDB, { eq }) => eq(customersDB.phone, req.body.phone),
    });
    if (existingCustomer) {
      reply.code(409).send({ message: "Phone number already exists" });
      return;
    }

    const { insertedId } = (
      await fastify.db
        .insert(customersDB)
        .values(req.body)
        .onConflictDoNothing()
        .returning({
          insertedId: customersDB.id,
        })
    )[0];

    const customer = await fastify.db.query.customersDB.findFirst({
      where: (customers, { eq }) => eq(customers.id, insertedId),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        createdByEmployee: includeCreatedByEmployee || undefined,
      },
    });
    reply.code(201).send(customer);
  });

  // query customer by id
  fastify.get<{
    Querystring: TCustomerQueryString;
    Params: TCustomerQueryParam;
  }>("/:id", QueryCustomerByIdOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop, includeCreatedByEmployee } = req.query;

    const customer = await fastify.db.query.customersDB.findFirst({
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
        createdByEmployee: includeCreatedByEmployee || undefined,
      },
      where: (customersDB, { eq }) => eq(customersDB.id, id),
    });

    if (!customer) {
      reply.code(404).send({ message: "Customer not found" });
      return;
    }

    reply.code(200).send(customer);
  });

  function queryCustomerBy(
    queryBy: TCustomerQueryByFields
  ): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TCustomerQueryParam;
      const {
        includeOwner,
        includeShop,
        includeCreatedByEmployee,
        limit,
        page,
        order,
        orderBy,
      } = req.query as TPagableCustomerQueryString;

      const offset = page && limit ? page * limit : undefined;

      const customers = await fastify.db.query.customersDB.findMany({
        where: (customersDB, { eq }) => eq(customersDB[queryBy], id),
        with: {
          owner: includeOwner || undefined,
          shop: includeShop || undefined,
          createdByEmployee: includeCreatedByEmployee || undefined,
        },
        limit: limit,
        offset: offset,
        orderBy: (customersDB, { asc, desc }) => {
          if (orderBy && order == "asc") {
            return asc(customersDB[orderBy]);
          } else if (orderBy && order == "desc") {
            return desc(customersDB[orderBy]);
          }
          return asc(customersDB.createdAt);
        },
      });

      const { total } = (
        await fastify.db
          .select({
            total: sql<number>`count(*)`.mapWith(Number),
          })
          .from(customersDB)
          .where(eq(customersDB[queryBy], id))
      )[0];

      reply.code(200).send({ rows: customers, total, page, limit });
    };
  }

  // query customers by shop id
  fastify.get<{
    Querystring: TPagableCustomerQueryString;
    Params: TCustomerQueryParam;
  }>("/shop/:id", QueryCustomersByShopOpts, queryCustomerBy("shopId"));

  // query customers by owner id
  fastify.get<{
    Querystring: TPagableCustomerQueryString;
    Params: TCustomerQueryParam;
  }>("/owner/:id", QueryCustomersByOwnerOpts, queryCustomerBy("ownerId"));

  // query customers by created employee id
  fastify.get<{
    Querystring: TPagableCustomerQueryString;
    Params: TCustomerQueryParam;
  }>(
    "/created-by-employee/:id",
    QueryCustomersByOwnerOpts,
    queryCustomerBy("createdByEmployeeId")
  );
};

export default CustomerRoutes;
