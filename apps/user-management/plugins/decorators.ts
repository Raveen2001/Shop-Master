import fp from "fastify-plugin";
import bcrypt from "bcrypt";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const decoratorPlugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.decorate(
    "hashPassword",
    async (password: string): Promise<string> => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }
  );

  fastify.decorate(
    "comparePassword",
    async (password: string, hash: string): Promise<boolean> => {
      const isPasswordValid = await bcrypt.compare(password, hash);
      return isPasswordValid;
    }
  );

  fastify.decorate("signJwt", (payload: Record<string, unknown>): string => {
    const token = fastify.jwt.sign(payload, { expiresIn: "1h" });
    return token;
  });

  fastify.decorate("refreshJwt", async (token: string): Promise<string> => {
    try {
      fastify.jwt.verify(token);
      return token;
    } catch (err: any) {
      if (err.code === "FAST_JWT_EXPIRED") {
        const data: Record<string, unknown> | null = fastify.jwt.decode(token);
        if (data) {
          delete data.exp;
          delete data.iat;

          const newToken = fastify.signJwt(data);
          return newToken;
        }
      }
      throw new Error("Invalid token");
    }
  });

  fastify.decorate("verifyJwt", async (request, reply) => {
    try {
      const token = request.headers.authorization;
      if (!token) {
        reply.code(401).send({ message: "No token provided" });
        return;
      }
      const data = fastify.jwt.verify(token);
      request.user = data;
    } catch {
      reply.code(401).send({ message: "Invalid token" });
    }
  });
};

export default fp(decoratorPlugin);
