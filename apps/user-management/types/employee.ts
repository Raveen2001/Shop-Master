import { EMPLOYEE_TYPE } from "database-drizzle";
import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { LoginTokenSchema, LoginWithUsernamePropsSchema } from "./auth";
import { OwnerSchemaWithoutPassword } from "./owner";
import { ShopSchema } from "./shop";

export const EmployeeSchema = Type.Object({
  id: Type.String(),
  username: Type.String({ minLength: 3, maxLength: 100 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  password: Type.String({ minLength: 8 }),
  image: Type.Optional(Type.String({ format: "uri" })),
  email: Type.Optional(Type.String({ format: "email" })),
  address: Type.String({ minLength: 3 }),
  type: Type.String({ enum: EMPLOYEE_TYPE }),
  createdAt: Type.String({ format: "date-time" }),
  ownerId: Type.String(),
  shopId: Type.String(),
});

export const EmployeeSchemaWithoutPassword = Type.Omit(EmployeeSchema, [
  "password",
]);

export const EmployeeSchemaIn = Type.Omit(EmployeeSchema, ["id", "createdAt"]);
export const EmployeeSchemaOut = Type.Intersect([
  EmployeeSchemaWithoutPassword,
  Type.Object({
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    shop: Type.Optional(ShopSchema),
  }),
]);

export type TEmployeeIn = Static<typeof EmployeeSchemaIn>;

export const EmployeeQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const EmployeeQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
});

export type TEmployeeQueryParam = Static<typeof EmployeeQueryParamSchema>;
export type TEmployeeQueryString = Static<typeof EmployeeQueryStringSchema>;

export const QueryEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get a employee by employee_id",
    params: EmployeeQueryParamSchema,
    querystring: EmployeeQueryStringSchema,
    response: {
      200: EmployeeSchemaOut,
    },
  },
};

export const QueryEmployeesByOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get all employees by owner_id",
    params: EmployeeQueryParamSchema,
    querystring: EmployeeQueryStringSchema,
    response: {
      200: Type.Array(EmployeeSchemaOut),
    },
  },
};

export const QueryEmployeesByShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get all employees by shop_id",
    params: EmployeeQueryParamSchema,
    querystring: EmployeeQueryStringSchema,
    response: {
      200: Type.Array(EmployeeSchemaOut),
    },
  },
};

export const CreateEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee", "Auth"],
    summary: "Create a new employee",
    body: EmployeeSchemaIn,
    querystring: EmployeeQueryStringSchema,
    response: {
      201: EmployeeSchemaOut,
    },
  },
};

export const LoginEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee", "Auth"],
    summary: "Login with username and password",

    body: LoginWithUsernamePropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};
