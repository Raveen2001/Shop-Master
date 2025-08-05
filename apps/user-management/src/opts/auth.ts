import { RouteShorthandOptions } from "fastify";
import {
  LoginWithEmailPropsSchema,
  LoginTokenSchema,
  LoginWithUsernamePropsSchema,
} from "../types/auth.js";

export const LoginWithEmailOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login with email and password",

    body: LoginWithEmailPropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};

export const LoginWithUsernameOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login with username and password",

    body: LoginWithUsernamePropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};

export const TokenRefreshOpt: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Refresh the token if it is expired but valid",
    response: {
      200: LoginTokenSchema,
    },
  },
};
