import { FastifyReply, FastifyRequest } from "fastify";

export const ownerOnlyRoute = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (request.userInfo.type !== "owner") {
    reply.code(401).send({ message: "Unauthorized" });
    return;
  }
};
