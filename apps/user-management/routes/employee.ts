import { Employee, employeesDB } from 'database-drizzle';
import { FastifyPluginOptions } from 'fastify';
import { TLoginWithUsernameIn } from '../types/auth';
import {
  CreateEmployeeOpts,
  LoginEmployeeOpts,
  QueryEmployeeOpts,
  QueryEmployeesByOwnerOpts,
  QueryEmployeesByShopOpts,
  TEmployeeQueryParam,
  TEmployeeQueryString,
} from '../types/employee';
import FastifyTypebox from '../types/fastify';

function EmployeePlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: () => void,
) {
  fastify.get<{
    Querystring: TEmployeeQueryString;
    Params: TEmployeeQueryParam;
  }>('/:id', QueryEmployeeOpts, async (req, reply) => {
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
      reply.code(404).send({ message: 'Employee not found' });
      return;
    }

    reply.code(200).send(employee);
  });

  fastify.post<{
    Body: TLoginWithUsernameIn;
  }>('/login', LoginEmployeeOpts, async (req, reply) => {
    const { username, password } = req.body;
    const employee = await fastify.db.query.employeesDB.findFirst({
      where: (employeesDB, { eq }) => eq(employeesDB.username, username),
    });

    if (!employee) {
      reply.code(404).send({ message: 'User not found' });
      return;
    }
    const isPasswordValid = await fastify.comparePassword(
      password,
      employee.password,
    );
    if (!isPasswordValid) {
      reply.code(401).send({ message: 'Invalid credentials' });
    }
    const token = fastify.signJwt(employee);
    reply.code(200).send({ token });
  });

  // create employee
  fastify.post<{
    Querystring: TEmployeeQueryString;
    Body: Employee;
  }>('/register', CreateEmployeeOpts, async (req, reply) => {
    const { includeOwner, includeShop } = req.query;
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
  }>('/owner/:id', QueryEmployeesByOwnerOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employees: Employee[] = await fastify.db.query.employeesDB.findMany({
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
  }>('/shop/:id', QueryEmployeesByShopOpts, async (req, reply) => {
    const { id } = req.params;
    const { includeOwner, includeShop } = req.query;

    const employees: Employee[] = await fastify.db.query.employeesDB.findMany({
      where: (employeesDB, { eq }) => eq(employeesDB.shopId, id),
      with: {
        owner: includeOwner || undefined,
        shop: includeShop || undefined,
      },
    });

    reply.code(200).send(employees);
  });

  next();
}

export default EmployeePlugin;
