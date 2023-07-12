import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

export const LoginWithEmailPropsSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export const LoginWithUsernamePropsSchema = Type.Object({
  username: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 8 }),
});

export const LoginTokenSchema = Type.Object({
  token: Type.String(),
});

export type TLoginWithEmailIn = Static<typeof LoginWithEmailPropsSchema>;
export type TLoginWithUsernameIn = Static<typeof LoginWithUsernamePropsSchema>;

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
    // tags: ["Auth"],
    summary: "Refresh the token if it is expired but valid",
    response: {
      200: LoginTokenSchema,
    },
  },
};
