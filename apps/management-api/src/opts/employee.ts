import { RouteShorthandOptions } from "fastify";
import {
  LoginWithUsernamePropsSchema,
  LoginTokenSchema,
} from "../types/auth.js";
import {
  EmployeeQueryParamSchema,
  EmployeeSchemaOut,
  PagableEmployeeQueryStringSchema,
  PagableEmployeeSchemaOut,
  EmployeeSchemaIn,
} from "../types/employee.js";
import { ownerOnlyRoute } from "../preHooks/permissions.js";

export const QueryEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get a employee by employee_id",
    params: EmployeeQueryParamSchema,
    response: {
      200: EmployeeSchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};

export const QueryEmployeeByTokenOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Get a employee by token",
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
  preHandler: ownerOnlyRoute,
};

export const CreateEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Employee"],
    summary: "Create a new employee",
    body: EmployeeSchemaIn,
    response: {
      201: EmployeeSchemaOut,
    },
  },
  preHandler: ownerOnlyRoute,
};

export const LoginEmployeeOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login with username and password",
    security: [],
    body: LoginWithUsernamePropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};
