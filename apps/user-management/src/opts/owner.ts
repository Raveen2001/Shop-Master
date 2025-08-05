import { RouteShorthandOptions } from "fastify";
import { LoginWithEmailPropsSchema, LoginTokenSchema } from "../types/auth.js";
import { OwnerSchemaIn, OwnerSchemaWithoutPassword } from "../types/owner.js";

export const CreateOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Create a new owner",
    body: OwnerSchemaIn,

    response: {
      201: OwnerSchemaWithoutPassword,
    },
  },
};

export const LoginOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login with email and password",
    security: [],
    body: LoginWithEmailPropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};

export const QueryOwnerByTokenOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner"],
    summary: "Get Owner by token",
    response: {
      200: OwnerSchemaWithoutPassword,
    },
  },
};
