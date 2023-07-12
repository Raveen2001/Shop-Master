import { employeesDB, eq, sql } from "database-drizzle";
import { FastifyPluginOptions } from "fastify";
import { TLoginWithUsernameIn } from "../types/auth";
import {
  CreateEmployeeOpts,
  LoginEmployeeOpts,
  QueryEmployeeOpts,
  QueryEmployeesByOwnerOpts,
  QueryEmployeesByShopOpts,
  TEmployeeIn,
  TEmployeeQueryParam,
  TEmployeeQueryString,
} from "../types/employee";
import FastifyTypebox from "../types/fastify";

function EmployeePlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: () => void
) {
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

  // login employee
  fastify.post<{
    Body: TLoginWithUsernameIn;
  }>("/login", LoginEmployeeOpts, async (req, reply) => {
    const { username, password } = req.body;
    const employee = await fastify.db.query.employeesDB.findFirst({
      where: (employeesDB, { eq }) => eq(employeesDB.username, username),
    });

    if (!employee) {
      reply.code(404).send({ message: "User not found" });
      return;
    }
    const isPasswordValid = await fastify.comparePassword(
      password,
      employee.password
    );
    if (!isPasswordValid) {
      reply.code(401).send({ message: "Invalid credentials" });
    }
    const token = fastify.signJwt(employee);
    reply.code(200).send({ token });
  });

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

  // query employees by owner id
  fastify.get<{
    Querystring: TEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>("/owner/:id", QueryEmployeesByOwnerOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employees = await fastify.db.query.employeesDB.findMany({
      where: (employees, { eq }) => eq(employees.ownerId, id),

      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
    });

    reply.code(200).send(employees);
  });

  // query employees by shop id
  fastify.post<{
    Querystring: TEmployeeQueryString;
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
        if (!orderBy) return asc(employeesDB.createdAt);
        if (order == "asc") {
          return asc(employeesDB[orderBy]);
        } else if (order == "desc") {
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

    reply.code(200).send({ rows: employees, total });
  });

  next();
}

export default EmployeePlugin;
