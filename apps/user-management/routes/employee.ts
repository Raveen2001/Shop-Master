import { Employee, Owner, Shop } from "database-drizzle";
import { FastifyPluginOptions } from "fastify";
import { TLoginTokenOut, TLoginWithUsernameIn } from "../types/auth";
import {
  LoginEmployeeOpts,
  QueryEmployeeOpts,
  TEmployeeQueryParam,
  TEmployeeQueryString,
} from "../types/employee";
import FastifyTypebox from "../types/fastify";

function EmployeePlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  fastify.get<{
    Querystring: TEmployeeQueryString;
    Params: TEmployeeQueryParam;
    Reply: Employee | { message: string };
  }>("/:id", QueryEmployeeOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employee = await fastify.db.query.employees.findFirst({
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
      where: (users, { eq }) => eq(users.id, id),
    });

    if (!employee) {
      reply.code(404).send({ message: "Employee not found" });
      return;
    }

    reply.code(200).send(employee as any);
  });

  fastify.post<{
    Body: TLoginWithUsernameIn;
    Reply: TLoginTokenOut | { message: string };
  }>("/login", LoginEmployeeOpts, async (req, reply) => {
    const { username, password } = req.body;
    const employee = await fastify.db.query.employees.findFirst({
      where: (employees, { eq }) => eq(employees.username, username),
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

  // // create employee
  // fastify.post<{
  //   Querystring: TEmployeeQueryString;
  //   Body: Employee;
  //   Reply: Employee & { owner: Owner; shop: Shop };
  // }>("/register", CreateEmployeeOpts, async (req, reply) => {
  //   const { includeOwner, includeShop } = req.query;
  //   const hashedPassword = await fastify.hashPassword(req.body.password);
  //   const employeeWithHashedPassword = {
  //     ...req.body,
  //     password: hashedPassword,
  //   };
  //   const employee = await fastify.prisma.employee.create({
  //     data: employeeWithHashedPassword,
  //     include: {
  //       owner: includeOwner,
  //       shop: includeShop,
  //     },
  //   });

  //   reply.code(201).send(employee);
  // });

  // // query employees by owner id
  // fastify.get<{
  //   Querystring: TEmployeeQueryString;
  //   Params: TEmployeeQueryParam;
  //   Reply: (Employee & { owner: Owner; shop: Shop })[] | { message: string };
  // }>("/owner/:id", QueryEmployeesByOwnerOpts, async (req, reply) => {
  //   const { id } = req.params;
  //   const { includeOwner, includeShop } = req.query;

  //   const employees = await fastify.prisma.employee.findMany({
  //     where: { ownerId: id },
  //     include: {
  //       owner: includeOwner,
  //       shop: includeShop,
  //     },
  //   });

  //   if (employees.length === 0) {
  //     reply.code(404).send({ message: "Employees not found" });
  //     return;
  //   }

  //   reply.code(200).send(employees);
  // });

  // // query employees by shop id
  // fastify.get<{
  //   Querystring: TEmployeeQueryString;
  //   Params: TEmployeeQueryParam;
  //   Reply: (Employee & { owner: Owner; shop: Shop })[] | { message: string };
  // }>("/shop/:id", QueryEmployeesByShopOpts, async (req, reply) => {
  //   const { id } = req.params;
  //   const { includeOwner, includeShop } = req.query;

  //   const employees = await fastify.prisma.employee.findMany({
  //     where: { shopId: id },
  //     include: {
  //       owner: includeOwner,
  //       shop: includeShop,
  //     },
  //   });

  //   if (employees.length === 0) {
  //     reply.code(404).send({ message: "Employees not found" });
  //     return;
  //   }

  //   reply.code(200).send(employees);
  // });

  next();
}

export default EmployeePlugin;
