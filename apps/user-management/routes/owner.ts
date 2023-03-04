import { Owner } from "@prisma/client";
import { FastifyPluginOptions } from "fastify";
import { TLoginWithEmailIn, TLoginTokenOut } from "../types/auth";
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
    Reply: TLoginTokenOut | { message: string };
  }>("/login", LoginOwnerOpts, async function (req, reply) {
    const owner = await fastify.prisma.owner.findUnique({
      where: {
        email: req.body.email,
      },
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
    Body: Owner;
    Reply: Owner;
  }>("/register", CreateOwnerOpts, async function (req, reply) {
    const hashedPassword = await fastify.hashPassword(req.body.password);

    const userWithHashedPassword = {
      ...req.body,
      password: hashedPassword,
    };

    const user = await fastify.prisma.owner.create({
      data: userWithHashedPassword,
    });

    reply.code(201).send(user);
  });

  // get owner by id
  fastify.get<{
    Params: TOwnerQueryParam;
    Querystring: TOwnerQueryString;
    Reply: Owner | { message: string };
  }>("/:id", QueryOwnerOpts, async function (req, reply) {
    const owner = await fastify.prisma.owner.findUnique({
      where: {
        id: req.params.id,
      },

      include: {
        shops: req.query.includeShops,
        employees: req.query.includeEmployees,
      },
    });

    if (!owner) {
      reply.code(404).send({ message: "Owner not found" });
      return;
    }

    reply.code(200).send(owner);
  });

  next();
}

export default ownerPlugin;
