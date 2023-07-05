import { EMPLOYEE_TYPE } from "database-drizzle";
import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { LoginTokenSchema, LoginWithEmailPropsSchema } from "./auth";
import OwnerSchemaDependency from "./ownerDependency";
import ShopSchemaDependency from "./shopDependency";

export const EmployeeSchema = Type.Object({
  id: Type.String(),
  username: Type.String({ minLength: 3, maxLength: 100 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  password: Type.String(),
  image: Type.Optional(Type.String({ format: "uri" })),
  email: Type.Optional(Type.String({ format: "email" })),
  address: Type.String({ minLength: 3 }),
  type: Type.String({ enum: EMPLOYEE_TYPE }),
  createdAt: Type.String({ format: "date-time" }),
  ownerId: Type.String(),
  shopId: Type.String(),
});

export const EmployeeSchemaIn = Type.Omit(EmployeeSchema, ["id", "createdAt"]);
export const EmployeeSchemaOut = Type.Omit(EmployeeSchema, [
  "ownerId",
  "shopId",
  "password",
]);

export type TShopIn = Static<typeof EmployeeSchemaIn>;

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

    body: LoginWithEmailPropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};
