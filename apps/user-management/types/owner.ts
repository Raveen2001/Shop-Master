import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { LoginTokenSchema, LoginWithEmailPropsSchema } from "./auth";
import { ShopSchema } from "./shop";
import { EmployeeSchema } from "./employee";

export const OwnerSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  email: Type.String({ format: "email" }),
  password: Type.String({
    minLength: 8,
  }),
  image: Type.Optional(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
});

export const OwnerSchemaWithoutPassword = Type.Omit(OwnerSchema, ["password"]);
export type TOwnerWithoutPassword = Static<typeof OwnerSchemaWithoutPassword>;

export const OwnerSchemaOut = Type.Intersect([
  OwnerSchemaWithoutPassword,
  Type.Object({
    shops: Type.Optional(Type.Array(ShopSchema)),
    employees: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);
export type TOwnerOut = Static<typeof OwnerSchemaOut>;

export const OwnerSchemaIn = Type.Omit(OwnerSchema, ["id", "createdAt"]);
export type TOwnerIn = Static<typeof OwnerSchemaIn>;

export const CreateOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner", "Auth"],
    summary: "Create a new owner",
    body: OwnerSchemaIn,
    response: {
      201: OwnerSchemaWithoutPassword,
    },
  },
};

export const LoginOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner", "Auth"],
    summary: "Login with email and password",

    body: LoginWithEmailPropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};

export const OwnerQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const OwnerQueryStringSchema = Type.Object({
  includeShops: Type.Boolean({ default: false }),
  includeEmployees: Type.Boolean({ default: false }),
});

export type TOwnerQueryParam = Static<typeof OwnerQueryParamSchema>;
export type TOwnerQueryString = Static<typeof OwnerQueryStringSchema>;

export const QueryOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner"],
    summary: "Get Owner by owner_id",
    params: OwnerQueryParamSchema,
    querystring: OwnerQueryStringSchema,
    response: {
      200: OwnerSchemaOut,
    },
  },
};
