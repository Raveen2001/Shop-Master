import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as employeesSchema from "./schema/employees";
import * as ownersSchema from "./schema/owners";
import * as shopsSchema from "./schema/shops";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, {
  schema: { ...employeesSchema, ...ownersSchema, ...shopsSchema },
  //   logger: true,
});

export default db;
export * from "./schema";
export * from "drizzle-orm";
