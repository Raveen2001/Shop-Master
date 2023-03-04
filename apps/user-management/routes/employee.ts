import { Employee, Owner, Shop } from "@prisma/client";
import { FastifyPluginOptions } from "fastify";
import {
  CreateEmployeeOpts,
  QueryEmployeeOpts,
  QueryEmployeesByOwnerOpts,
  QueryEmployeesByShopOpts,
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
    Reply: (Employee & { owner: Owner; shop: Shop }) | { message: string };
  }>("/:id", QueryEmployeeOpts, async function (req, reply) {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employee = await fastify.prisma.employee.findUnique({
      where: { id },
      include: {
        owner: includeOwner,
        shop: includeShop,
      },
    });

    if (!employee) {
      reply.code(404).send({ message: "Employee not found" });
      return;
    }

    reply.code(200).send(employee);
  });

  // create employee
  fastify.post<{
    Querystring: TEmployeeQueryString;
    Body: Employee;
    Reply: Employee & { owner: Owner; shop: Shop };
  }>("/", CreateEmployeeOpts, async function (req, reply) {
    const { includeOwner, includeShop } = req.query;
    const employee = await fastify.prisma.employee.create({
      data: req.body,
      include: {
        owner: includeOwner,
        shop: includeShop,
      },
    });

    reply.code(201).send(employee);
  });

  // query employees by owner id
  fastify.get<{
    Querystring: TEmployeeQueryString;
    Params: TEmployeeQueryParam;
    Reply: (Employee & { owner: Owner; shop: Shop })[] | { message: string };
  }>("/owner/:id", QueryEmployeesByOwnerOpts, async function (req, reply) {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employees = await fastify.prisma.employee.findMany({
      where: { ownerId: id },
      include: {
        owner: includeOwner,
        shop: includeShop,
      },
    });

    if (employees.length === 0) {
      reply.code(404).send({ message: "Employees not found" });
      return;
    }

    reply.code(200).send(employees);
  });

  // query employees by shop id
  fastify.get<{
    Querystring: TEmployeeQueryString;
    Params: TEmployeeQueryParam;
    Reply: (Employee & { owner: Owner; shop: Shop })[] | { message: string };
  }>("/shop/:id", QueryEmployeesByShopOpts, async function (req, reply) {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employees = await fastify.prisma.employee.findMany({
      where: { shopId: id },
      include: {
        owner: includeOwner,
        shop: includeShop,
      },
    });

    if (employees.length === 0) {
      reply.code(404).send({ message: "Employees not found" });
      return;
    }

    reply.code(200).send(employees);
  });

  next();
}

export default EmployeePlugin;
