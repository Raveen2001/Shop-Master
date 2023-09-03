import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as ownersSchema from "./schema/owners";
import * as shopsSchema from "./schema/shops";

import * as employeesSchema from "./schema/employees";
import * as employeePaymentsSchema from "./schema/employee_payments";

import * as customersSchema from "./schema/customers";
import * as customerPaymentsSchema from "./schema/customer_payments";

import * as brandsSchema from "./schema/brands";
import * as productCategoriesSchema from "./schema/product_categories";
import * as productSubCategoriesSchema from "./schema/product_sub_categories";

if (!process.env.DATABASE_URL) {
  console.log("Database url is not available");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, {
  schema: {
    ...shopsSchema,
    ...ownersSchema,

    ...employeesSchema,
    ...employeePaymentsSchema,

    ...customersSchema,
    ...customerPaymentsSchema,

    ...brandsSchema,
    ...productCategoriesSchema,
    ...productSubCategoriesSchema,
  },
  //   logger: true,
});

export default db;
export * from "./schema";
export * from "drizzle-orm";
