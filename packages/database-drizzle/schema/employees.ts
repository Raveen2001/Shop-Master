import { InferModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { Owner, owners } from "./owners";
import { Shop, shops } from "./shops";

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
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 10 }).notNull(),
  image: text("image"),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  type: employeeTypeEnum("type").notNull(),
  shopId: uuid("shop_id")
    .notNull()
    .references(() => shops.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => owners.id),
});

export const employeesRelations = relations(employees, ({ one }) => ({
  shop: one(shops, { fields: [employees.shopId], references: [shops.id] }),
  owner: one(owners, { fields: [employees.ownerId], references: [owners.id] }),
}));

export type Employee = InferModel<typeof employees> & {
  shop: Shop;
  owner: Owner;
};

export const EMPLOYEE_TYPE = employeeTypeEnum.enumValues;
