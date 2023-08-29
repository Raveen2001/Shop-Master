import { QueryOwnerByTokenOpts, QueryOwnerOpts } from "../opts/owner.opts";
import {
  TOwner,
  TOwnerQueryParam,
  TOwnerQueryString,
} from "../types/owner.types";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const OwnerRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  fastify.get("/me", QueryOwnerByTokenOpts, async (req, reply) => {
    const user = req.user as TOwner;
    const owner = await fastify.db.query.ownersDB.findFirst({
      where: (ownersDB, { eq }) => eq(ownersDB.id, user.id),
    });

    if (!owner) {
      reply.code(404).send({ message: "Owner not found" });
      return;
    }

    reply.code(200).send(owner);
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
};

export default OwnerRoutes;
