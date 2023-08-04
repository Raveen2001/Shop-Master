import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as employeesSchema from "./schema/employees";
import * as ownersSchema from "./schema/owners";
import * as shopsSchema from "./schema/shops";
import * as employeePaymentsSchema from "./schema/employee_payments";
import * as brandsSchema from "./schema/brands";

if (!process.env.DATABASE_URL) {
  console.log("Database url is not available");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, {
  schema: {
    ...employeesSchema,
    ...ownersSchema,
    ...shopsSchema,
    ...employeePaymentsSchema,
    ...brandsSchema,
  },
  //   logger: true,
});

export default db;
export * from "./schema";
export * from "drizzle-orm";
