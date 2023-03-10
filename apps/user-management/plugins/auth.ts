import FastifyPlugin from "fastify-plugin";
import bcrypt from "bcrypt";
import FastifyTypebox from "../types/fastify";

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
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

  fastify.decorate("signJwt", (payload: any): string => {
    const token = fastify.jwt.sign(payload, { expiresIn: "1h" });
    return token;
  });

  fastify.decorate("refreshJwt", async (token: string): Promise<string> => {
    try {
      fastify.jwt.verify(token);
      return token;
    } catch (err: any) {
      if (err.code === "FAST_JWT_EXPIRED") {
        const data = fastify.jwt.decode(token) as any;
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
  done();
}

export default FastifyPlugin(swaggerPlugin);
