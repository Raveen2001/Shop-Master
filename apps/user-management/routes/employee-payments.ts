import {
  sql,
  eq,
  TEMPLOYEE_PAYMENT_QUERY_BY_FIELDS,
  employeePaymentsDB,
} from "database-drizzle";
import {
  TEmployeePaymentIn,
  TEmployeePaymentQueryParam,
  TPagableEmployeePaymentQueryString,
} from "../types/employee-payments";

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { RouteHandlerMethod } from "fastify";
import {
  CreateEmployeePaymentOpts,
  QueryEmployeesPaymentsByIdOpts,
} from "../opts/employee-payments";

const EmployeePaymentRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  // create employee payment
  fastify.post<{
    Body: TEmployeePaymentIn;
  }>("/create", CreateEmployeePaymentOpts, async (req, reply) => {
    const data = {
      ...req.body,
      createdAt: new Date(req.body.createdAt),
    };

    const employeePayment = (
      await fastify.db.insert(employeePaymentsDB).values(data).returning()
    ).at(0);

    reply.code(201).send(employeePayment);
  });

  function queryEmployeePaymentsBy(
    queryBy: TEMPLOYEE_PAYMENT_QUERY_BY_FIELDS
  ): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TEmployeePaymentQueryParam;
      const {
        includeCreatedByEmployee,
        includeEmployee,
        includeOwner,
        includeShop,
        limit,
        page,
        order,
        orderBy,
      } = req.query as TPagableEmployeePaymentQueryString;

      const offset =
        page !== undefined && limit !== undefined ? page * limit : undefined;

      const employeePayments =
        await fastify.db.query.employeePaymentsDB.findMany({
          where: (employeePaymentsDB, { eq }) =>
            eq(employeePaymentsDB[queryBy], id),

          with: {
            createdByEmployee: includeCreatedByEmployee || undefined,
            employee: includeEmployee || undefined,
            owner: includeOwner || undefined,
            shop: includeShop || undefined,
          },
          limit: limit,
          offset: offset,
          orderBy: (employeePaymentsDB, { asc, desc }) => {
            if (orderBy && order == "asc") {
              return asc(employeePaymentsDB[orderBy]);
            } else if (orderBy && order == "desc") {
              return desc(employeePaymentsDB[orderBy]);
            }
            return asc(employeePaymentsDB.createdAt);
          },
        });

      const { total } = (
        await fastify.db
          .select({
            total: sql<number>`count(*)`.mapWith(Number),
          })
          .from(employeePaymentsDB)
          .where(eq(employeePaymentsDB[queryBy], id))
      )[0];

      const result = { rows: employeePayments, total, page, limit };

      reply.code(200).send(result);
    };
  }

  // query employees payments by owner id
  fastify.get<{
    Querystring: TPagableEmployeePaymentQueryString;
    Params: TEmployeePaymentQueryParam;
  }>(
    "/owner/:id",
    QueryEmployeesPaymentsByIdOpts,
    queryEmployeePaymentsBy("ownerId")
  );

  // query employees payments by shop id
  fastify.get<{
    Querystring: TPagableEmployeePaymentQueryString;
    Params: TEmployeePaymentQueryParam;
  }>(
    "/shop/:id",
    QueryEmployeesPaymentsByIdOpts,
    queryEmployeePaymentsBy("shopId")
  );

  // query employees payments by employee id
  fastify.get<{
    Querystring: TPagableEmployeePaymentQueryString;
    Params: TEmployeePaymentQueryParam;
  }>(
    "/employee/:id",
    QueryEmployeesPaymentsByIdOpts,
    queryEmployeePaymentsBy("employeeId")
  );

  // query employees payments by created by employee id
  fastify.get<{
    Querystring: TPagableEmployeePaymentQueryString;
    Params: TEmployeePaymentQueryParam;
  }>(
    "/createdByEmployee/:id",
    QueryEmployeesPaymentsByIdOpts,
    queryEmployeePaymentsBy("createdByEmployeeId")
  );
};

export default EmployeePaymentRoutes;
