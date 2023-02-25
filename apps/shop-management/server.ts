import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import FastifyTypebox from "./types/fastify.type";
import authPlugin from "./routes/auth";

import SwaggerPlugin from "./swagger";

const fastify: FastifyTypebox = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.get("/ping", async (request, reply) => {
  return "pong";
});

// register swagger
fastify.register(SwaggerPlugin);

fastify.register(authPlugin, { prefix: "/auth" });

// start the server
fastify.listen({ port: 3000 }, async (err, adddress) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await fastify.ready();
  fastify.swagger();
  console.log(`Server listening on ${adddress}`);
});
