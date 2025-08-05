import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { db } from "database-drizzle";
import { TToken } from "types";

declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
    hashPassword: (password: string) => Promise<string>;
    comparePassword: (password: string, hash: string) => Promise<boolean>;
    signJwt: (payload: Record<string, unknown>) => string;
    refreshJwt: (token: string) => Promise<string>;
    verifyJwt: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    userInfo: TToken;
  }
}

type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export default FastifyTypebox;
