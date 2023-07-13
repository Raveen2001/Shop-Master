import { EMPLOYEE_DB_COLUMNS } from "./../../../packages/database-drizzle/schema/employees";
import { EMPLOYEE_TYPE } from "database-drizzle";
import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";
import { LoginTokenSchema, LoginWithUsernamePropsSchema } from "./auth";
import { OwnerSchemaWithoutPassword } from "./owner";
import { ShopSchema } from "./shop";
import { PagableQueryStringSchema, PagableSchema } from "./common";

export const EmployeeSchema = Type.Object({
  id: Type.String(),
  username: Type.String({ minLength: 3, maxLength: 100 }),
  name: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 8 }),
  email: Type.Optional(Type.String({ format: "email" })),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  image: Type.Optional(Type.String({ format: "uri" })),
  address: Type.String({ minLength: 3 }),
  createdAt: Type.String({ format: "date-time" }),
  type: Type.Union(EMPLOYEE_TYPE.map((key) => Type.Literal(key))),
  shopId: Type.String(),
  ownerId: Type.String(),
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

export const PagableEmployeeSchemaOut = PagableSchema(EmployeeSchemaOut);

export type TEmployeeIn = Static<typeof EmployeeSchemaIn>;
export type TPagedEmployeeOut = Static<typeof PagableEmployeeSchemaOut>;

export const EmployeeQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const EmployeeQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
});

export const PagableEmployeeQueryStringSchema = PagableQueryStringSchema(
  EmployeeQueryStringSchema,
  EMPLOYEE_DB_COLUMNS
);

export type TEmployeeQueryParam = Static<typeof EmployeeQueryParamSchema>;
export type TEmployeeQueryString = Static<typeof EmployeeQueryStringSchema>;
export type TPagableEmployeeQueryString = Static<
  typeof PagableEmployeeQueryStringSchema
>;

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
    querystring: PagableEmployeeQueryStringSchema,
    response: {
      200: PagableEmployeeSchemaOut,
    },
  },
};

export const QueryEmployeesByShopOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get all employees by shop_id",
    params: EmployeeQueryParamSchema,
    querystring: PagableEmployeeQueryStringSchema,
    response: {
      200: PagableEmployeeSchemaOut,
    },
  },
};

export const CreateEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Create a new employee",
    body: EmployeeSchemaIn,
    response: {
      201: EmployeeSchemaOut,
    },
  },
};

export const LoginEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login with username and password",

    body: LoginWithUsernamePropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};
