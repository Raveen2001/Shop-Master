import { InferModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { ownersDB } from "./owners";
import { shopsDB } from "./shops";

export const employeeTypeEnum = pgEnum("employeeType", [
  "MANAGER",
  "CASHIER",
  "ACCOUNTANT",
  "SALESMAN",
  "DELIVERY_PERSON",
  "PARCEL_COUNTER_DEVICE",
  "BILLING_DEVICE",
]);

export const employeesDB = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 10 }).notNull(),
  image: text("image"),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  type: employeeTypeEnum("type").notNull(),
  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const EMPLOYEE_DB_COLUMNS = [
  "id",
  "username",
  "name",
  "password",
  "email",
  "phone",
  "image",
  "address",
  "createdAt",
  "type",
  "shopId",
  "ownerId",
] as const;

export const employeesRelations = relations(employeesDB, ({ one }) => ({
  shop: one(shopsDB, {
    fields: [employeesDB.shopId],
    references: [shopsDB.id],
  }),
  owner: one(ownersDB, {
    fields: [employeesDB.ownerId],
    references: [ownersDB.id],
  }),
}));

export type TEmployeeDB = InferModel<typeof employeesDB>;

export const EMPLOYEE_TYPES = employeeTypeEnum.enumValues;
