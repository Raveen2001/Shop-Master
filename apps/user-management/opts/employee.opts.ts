import { RouteShorthandOptions } from "fastify";
import {
  LoginWithUsernamePropsSchema,
  LoginTokenSchema,
} from "../types/auth.types";
import {
  EmployeeQueryParamSchema,
  EmployeeQueryStringSchema,
  EmployeeSchemaOut,
  PagableEmployeeQueryStringSchema,
  PagableEmployeeSchemaOut,
  EmployeeSchemaIn,
} from "../types/employee.types";

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
    tags: ["Employee"],
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
    security: [],
    body: LoginWithUsernamePropsSchema,
    response: {
      200: LoginTokenSchema,
    },
  },
};
