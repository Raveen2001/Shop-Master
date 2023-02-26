import { RouteShorthandOptions } from "fastify";
import { LoginTokenSchema } from "./owner";

export const TokenRefreshOpt: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Refresh the token if it is expired but valid",
    response: {
      200: LoginTokenSchema,
    },
  },
};
