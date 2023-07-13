import { employeesDB, eq, sql } from "database-drizzle";
import {
  CreateEmployeeOpts,
  QueryEmployeeOpts,
  QueryEmployeesByOwnerOpts,
  QueryEmployeesByShopOpts,
  TEmployeeIn,
  TEmployeeQueryParam,
  TEmployeeQueryString,
  TPagableEmployeeQueryString,
} from "../types/employee";

import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const EmployeeRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // create employee
  fastify.post<{
    Querystring: TEmployeeQueryString;
    Body: TEmployeeIn;
  }>("/register", CreateEmployeeOpts, async (req, reply) => {
    const { includeOwner, includeShop } = req.query;

    // check if the employee username already exists
    const existingEmployee = await fastify.db.query.employeesDB.findFirst({
      where: (employeesDB, { eq }) =>
        eq(employeesDB.username, req.body.username),
    });
    if (existingEmployee) {
      reply.code(409).send({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await fastify.hashPassword(req.body.password);
    const employeeWithHashedPassword = {
      ...req.body,
      password: hashedPassword,
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
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
    });
    reply.code(201).send(employee);
  });

  // query employee by id
  fastify.get<{
    Querystring: TEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>("/:id", QueryEmployeeOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employee = await fastify.db.query.employeesDB.findFirst({
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
      where: (employeesDB, { eq }) => eq(employeesDB.id, id),
    });

    if (!employee) {
      reply.code(404).send({ message: "Employee not found" });
      return;
    }

    reply.code(200).send(employee);
  });

  // query employees by owner id
  fastify.get<{
    Querystring: TPagableEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>("/owner/:id", QueryEmployeesByOwnerOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop, limit, page, order, orderBy } =
      req.query;

    const offset = page && limit ? page * limit : undefined;

    const employees = await fastify.db.query.employeesDB.findMany({
      where: (employees, { eq }) => eq(employees.ownerId, id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
      limit: limit,
      offset: offset,
      orderBy: (employeesDB, { asc, desc }) => {
        if (orderBy && order == "asc") {
          return asc(employeesDB[orderBy]);
        } else if (orderBy && order == "desc") {
          return desc(employeesDB[orderBy]);
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
        .where(eq(employeesDB.ownerId, id))
    )[0];

    reply.code(200).send({ rows: employees, total, page, limit });
  });

  // query employees by shop id
  fastify.get<{
    Querystring: TPagableEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>("/shop/:id", QueryEmployeesByShopOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop, limit, page, order, orderBy } =
      req.query;

    const offset = page && limit ? page * limit : undefined;

    const employees = await fastify.db.query.employeesDB.findMany({
      where: (employeesDB, { eq }) => eq(employeesDB.shopId, id),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
      limit: limit,
      offset: offset,
      orderBy: (employeesDB, { asc, desc }) => {
        if (orderBy && order == "asc") {
          return asc(employeesDB[orderBy]);
        } else if (orderBy && order == "desc") {
          return desc(employeesDB[orderBy]);
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
        .where(eq(employeesDB.shopId, id))
    )[0];

    reply.code(200).send({ rows: employees, total, page, limit });
  });
};

export default EmployeeRoutes;
