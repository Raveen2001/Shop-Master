import { FastifyPluginOptions } from 'fastify';
import FastifyPlugin from 'fastify-plugin';
import FastifyTypebox from '../types/fastify';
import { TokenRefreshOpt } from '../types/auth';

function shopPlugin(
  fastify: FastifyTypebox,
  options: FastifyPluginOptions,
  next: () => void,
) {
  fastify.get<{
    Headers: { authorization: string };
  }>('/refresh-token', TokenRefreshOpt, async (req, reply) => {
    const token = req.headers.authorization;
    try {
      const newToken = await fastify.refreshJwt(token);
      reply.code(200).send({ token: newToken });
    } catch (err) {
      reply.code(401).send({ message: 'Invalid token' });
    }
  });
  next();
}

export default FastifyPlugin(shopPlugin);
