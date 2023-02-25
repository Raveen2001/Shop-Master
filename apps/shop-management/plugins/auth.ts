import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import bcrypt from "bcrypt";

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  fastify.decorate("hashPassword", async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  });

  fastify.decorate(
    "comparePassword",
    async (password: string, hash: string) => {
      const isPasswordValid = await bcrypt.compare(password, hash);
      return isPasswordValid;
    }
  );

  done();
}

export default FastifyPlugin(swaggerPlugin);
