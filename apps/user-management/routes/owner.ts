import { ownersDB } from "database-drizzle";
import { FastifyPluginOptions } from "fastify";
import { TLoginWithEmailIn } from "../types/auth";
import FastifyTypebox from "../types/fastify";
import {
  CreateOwnerOpts,
  LoginOwnerOpts,
  QueryOwnerOpts,
  TOwnerIn,
  TOwnerQueryParam,
  TOwnerQueryString,
} from "../types/owner";

function ownerPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  // Login as owner
  fastify.post<{
    Body: TLoginWithEmailIn;
  }>("/login", LoginOwnerOpts, async (req, reply) => {
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

  // Register as owner
  fastify.post<{
    Body: TOwnerIn;
  }>("/register", CreateOwnerOpts, async (req, reply) => {
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

  // get owner by id
  fastify.get<{
    Params: TOwnerQueryParam;
    Querystring: TOwnerQueryString;
  }>("/:id", QueryOwnerOpts, async (req, reply) => {
    const owner = await fastify.db.query.ownersDB.findFirst({
      where: (ownersDB, { eq }) => eq(ownersDB.id, req.params.id),

      with: {
        employees: req.query.includeEmployees || undefined,
        shops: req.query.includeShops || undefined,
      },
    });

    reply.code(200).send(owner);
  });

  next();
}

export default ownerPlugin;
