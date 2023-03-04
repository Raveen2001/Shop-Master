import { FastifyPluginOptions } from "fastify";
import FastifyTypebox from "../types/fastify";
import FastifyPlugin from "fastify-plugin";
import { TokenRefreshOpt } from "../types/token";

function shopPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: Function
) {
  fastify.get<{
    Headers: { authorization: string };
  }>("/refresh-token", TokenRefreshOpt, async function (req, reply) {
    const token = req.headers.authorization;
    try {
      const newToken = await fastify.refreshJwt(token);
      reply.code(200).send({ token: newToken });
    } catch (err: any) {
      reply.code(401).send({ message: "Invalid token" });
    }
  });
  next();
}

export default FastifyPlugin(shopPlugin);
