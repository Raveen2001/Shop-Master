import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

export const OwnerSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  phone: Type.String({ format: "regex", pattern: "^(\\+\\d{1,3}\\s)\\d{10}$" }), // prettier-ignore
  email: Type.String({ format: "email" }),
  password: Type.String({
    minLength: 8,
  }),
  image: Type.Union([Type.String(), Type.Null()]),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type TOwner = Static<typeof OwnerSchema>;
export type TOwnerIn = Omit<TOwner, "id" | "createdAt" | "updatedAt">;
export type TOwnerOut = Omit<TOwner, "password">;

export const CreateOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner"],
    summary: "Create a new owner",
    body: Type.Omit(OwnerSchema, ["id", "createdAt", "updatedAt"]),
    response: {
      201: Type.Omit(OwnerSchema, ["password"]),
    },
  },
};

export const LoginPropsSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export const LoginTokenSchema = Type.Object({
  token: Type.String(),
});

export type TLoginPropsIn = Static<typeof LoginPropsSchema>;
export type TLoginTokenOut = Static<typeof LoginTokenSchema>;

export const LoginOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner"],
    summary: "Login owner",
    body: LoginPropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};
