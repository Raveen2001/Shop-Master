import { QueryOwnerByTokenOpts } from "../opts/owner.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { TEmployeeWithPassword } from "../types/employee.js";
import { TOwnerWithoutPassword } from "../types/owner.js";

const OwnerRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("preHandler", fastify.auth([fastify.verifyJwt]));

  fastify.get("/", QueryOwnerByTokenOpts, async (req, reply) => {
    console.log(req.userInfo);
    let ownerId: string;
    if (req.userInfo.type === "owner") {
      const owner = req.userInfo.data as TOwnerWithoutPassword;
      ownerId = owner.id;
    } else if (req.userInfo.type === "employee") {
      const employee = req.userInfo.data as TEmployeeWithPassword;
      ownerId = employee.ownerId;
    } else {
      reply.code(401).send({ message: "Unauthorized" });
      return;
    }

    const owner = await fastify.db.query.ownersDB.findFirst({
      where: (ownersDB, { eq }) => eq(ownersDB.id, ownerId),
    });

    if (!owner) {
      reply.code(404).send({ message: "Owner not found" });
      return;
    }

    reply.code(200).send(owner);
  });
};

export default OwnerRoutes;
