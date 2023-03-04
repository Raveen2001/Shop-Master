import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

export const LoginWithEmailPropsSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export const LoginTokenSchema = Type.Object({
  token: Type.String(),
});

export type TLoginWithEmailIn = Static<typeof LoginWithEmailPropsSchema>;
export type TLoginTokenOut = Static<typeof LoginTokenSchema>;

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
