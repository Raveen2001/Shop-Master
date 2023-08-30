import { FastifyPluginAsync } from "fastify";

const HelperRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/ping", async (req, reply) => {
    reply.code(200).send({
      message: "Pong, Welcome to user management api!",
    });
  });
};

export default HelperRoutes;
