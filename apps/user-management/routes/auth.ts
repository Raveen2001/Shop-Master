import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ownersDB } from "database-drizzle";
import { TLoginWithEmailIn, TLoginWithUsernameIn } from "../types/auth";
import { LoginOwnerOpts, TOwnerIn, CreateOwnerOpts } from "../types/owner";
import { LoginEmployeeOpts } from "../types/employee";

const AuthRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  // Register as owner
  fastify.post<{
    Body: TOwnerIn;
  }>("/owner/register", CreateOwnerOpts, async (req, reply) => {
    // check if email already exists
    const existingOwner = await fastify.db.query.ownersDB.findFirst({
      where: (ownersDB, { eq }) => eq(ownersDB.email, req.body.email),
    });

    if (existingOwner) {
      reply.code(409).send({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await fastify.hashPassword(req.body.password);

    const userWithHashedPassword = {
      ...req.body,
      password: hashedPassword,
    };

    const user = (
      await fastify.db
        .insert(ownersDB)
        .values(userWithHashedPassword)
        .onConflictDoNothing()
        .returning()
    )[0];

    reply.code(201).send(user);
  });

  fastify.post<{
    Body: TLoginWithEmailIn;
  }>("/owner/login", LoginOwnerOpts, async (req, reply) => {
    const owner = await fastify.db.query.ownersDB.findFirst({
      where: (ownersDB, { eq }) => eq(ownersDB.email, req.body.email),
    });

    if (!owner) {
      reply.code(404).send({ message: "User not found" });
      return;
    }
    const isPasswordValid = await fastify.comparePassword(
      req.body.password,
      owner.password
    );
    if (!isPasswordValid) {
      reply.code(401).send({ message: "Invalid credentials" });
    }
    const token = fastify.signJwt(owner);
    reply.code(200).send({ token });
  });

  // login employee
  fastify.post<{
    Body: TLoginWithUsernameIn;
  }>("/employee/login", LoginEmployeeOpts, async (req, reply) => {
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
};

export default AuthRoutes;
