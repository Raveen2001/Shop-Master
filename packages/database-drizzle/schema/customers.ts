import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { employeesDB } from "./employees";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const customerTypeEnum = pgEnum("customer_type", ["SHOP", "INDIVIDUAL"]);

export const customerDB = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  image: text("image"),
  type: customerTypeEnum("type").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
  createdByEmployeeId: uuid("created_by_employee_id").references(
    () => employeesDB.id
  ),
});

export const CUSTOMER_DB_COLUMNS = [
  "id",
  "name",
  "phone",
  "email",
  "image",
  "type",
  "address",
  "createdAt",
  "updatedAt",
  "shopId",
  "ownerId",
  "createdByEmployeeId",
] as const;

export const customerRelations = relations(customerDB, ({ one }) => ({
  createdByEmployee: one(employeesDB, {
    fields: [customerDB.createdByEmployeeId],
    references: [employeesDB.id],
  }),

  shop: one(shopsDB, {
    fields: [customerDB.shopId],
    references: [shopsDB.id],
  }),

  owner: one(ownersDB, {
    fields: [customerDB.ownerId],
    references: [ownersDB.id],
  }),
}));

export type TCustomerDB = typeof customerDB.$inferSelect;
export type TNewCustomerDB = typeof customerDB.$inferInsert;

export const CUSTOMER_TYPES = customerTypeEnum.enumValues;
