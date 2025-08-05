import { employeesDB, eq, sql, TNewEmployeeDB } from "database-drizzle";
import {
  TEmployeeQueryByFields,
  TEmployeeIn,
  TEmployeeQueryParam,
  TPagableEmployeeQueryString,
  TEmployeeWithPassword,
} from "../types/employee.js";

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { RouteHandlerMethod } from "fastify";
import {
  CreateEmployeeOpts,
  QueryEmployeeOpts,
  QueryEmployeesByShopOpts,
  QueryEmployeesByOwnerOpts,
  QueryEmployeeByTokenOpts,
} from "../opts/employee.js";
import { TOwnerWithoutPassword } from "../types/owner.js";

export const EmployeeRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  fastify.get("/", QueryEmployeeByTokenOpts, async (req, reply) => {
    const employee = req.userInfo.data as TEmployeeWithPassword;
    reply.code(200).send(employee);
  });

  // create employee
  fastify.post<{
    Body: TEmployeeIn;
  }>("/register", CreateEmployeeOpts, async (req, reply) => {
    // check if the employee username already exists
    const owner = req.userInfo.data as TOwnerWithoutPassword;

    const existingEmployee = await fastify.db.query.employeesDB.findFirst({
      where: (employeesDB, { eq, and }) =>
        and(
          eq(employeesDB.username, req.body.username),
          eq(employeesDB.ownerId, owner.id),
          eq(employeesDB.shopId, req.body.shopId)
        ),
    });
    if (existingEmployee) {
      reply.code(409).send({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await fastify.hashPassword(req.body.password);
    const employeeWithHashedPassword: TNewEmployeeDB = {
      ...req.body,
      password: hashedPassword,
      ownerId: owner.id,
    };
    const { insertedId } = (
      await fastify.db
        .insert(employeesDB)
        .values(employeeWithHashedPassword)
        .onConflictDoNothing()
        .returning({
          insertedId: employeesDB.id,
        })
    )[0];

    const employee = await fastify.db.query.employeesDB.findFirst({
      where: (employees, { eq }) => eq(employees.id, insertedId),
    });
    reply.code(201).send(employee);
  });

  // query employee by id
  fastify.get<{
    Params: TEmployeeQueryParam;
  }>("/:id", QueryEmployeeOpts, async (req, reply) => {
    const { id } = req.params;

    const employee = await fastify.db.query.employeesDB.findFirst({
      where: (employeesDB, { eq }) => eq(employeesDB.id, id),
    });

    if (!employee) {
      reply.code(404).send({ message: "Employee not found" });
      return;
    }

    reply.code(200).send(employee);
  });

  function queryEmployeeBy(
    queryBy: TEmployeeQueryByFields
  ): RouteHandlerMethod {
    return async (req, reply) => {
      const { id } = req.params as TEmployeeQueryParam;
      const { limit, page, order, orderBy } =
        req.query as TPagableEmployeeQueryString;

      const offset = page && limit ? page * limit : undefined;

      const employees = await fastify.db.query.employeesDB.findMany({
        where: (employeesDB, { eq }) => eq(employeesDB[queryBy], id),
        limit: limit,
        offset: offset,
        orderBy: (employeesDB, { asc, desc }) => {
          if (orderBy && order == "asc") {
            return asc(employeesDB[orderBy as keyof typeof employeesDB]);
          } else if (orderBy && order == "desc") {
            return desc(employeesDB[orderBy as keyof typeof employeesDB]);
          }
          return asc(employeesDB.createdAt);
        },
      });

      const { total } = (
        await fastify.db
          .select({
            total: sql<number>`count(*)`.mapWith(Number),
          })
          .from(employeesDB)
          .where(eq(employeesDB[queryBy], id))
      )[0];

      reply.code(200).send({ rows: employees, total, page, limit });
    };
  }

  // query employees by shop id
  fastify.get<{
    Querystring: TPagableEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>("/shop/:id", QueryEmployeesByShopOpts, queryEmployeeBy("shopId"));

  // query employees by owner id
  fastify.get<{
    Querystring: TPagableEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>("/owner/:id", QueryEmployeesByOwnerOpts, queryEmployeeBy("ownerId"));
};

export default EmployeeRoutes;
