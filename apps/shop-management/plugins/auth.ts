import FastifyPlugin from "fastify-plugin";
import FastifyTypebox from "../types/fastify";
import bcrypt from "bcrypt";

async function swaggerPlugin(fastify: FastifyTypebox, ops: any, done: any) {
  fastify.decorate("hashPassword", async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  });
  done();
}

export default FastifyPlugin(swaggerPlugin);
