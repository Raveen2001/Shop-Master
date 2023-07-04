import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { owners } from "./owners";
import { shops } from "./shops";

export const employeeTypeEnum = pgEnum("employeeType", [
  "MANAGER",
  "CASHIER",
  "ACCOUNTANT",
  "SALESMAN",
  "DELIVERY_PERSON",
  "PARCEL_COUNTER_DEVICE",
  "BILLING_DEVICE",
]);

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  phone: varchar("phone", { length: 10 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  type: employeeTypeEnum("type").notNull(),
  shopId: uuid("shop_id").references(() => shops.id),
  ownerId: uuid("owner_id").references(() => owners.id),
});

export const employeesRelations = relations(employees, ({ one }) => ({
  shop: one(shops, { fields: [employees.shopId], references: [shops.id] }),
  owner: one(owners, { fields: [employees.ownerId], references: [owners.id] }),
}));
