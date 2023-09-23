import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, serial } from "drizzle-orm/pg-core";
import { ownersDB } from "./owners";
import { shopsDB } from "./shops";
import { customersDB } from "./customers";
import { employeesDB } from "./employees";
import { orderItemsDB } from "./order_items";

export const paymentTypeEnum = pgEnum("payment_type", ["CASH", "UPI", "CARD"]);

export const ordersDB = pgTable("orders", {
  id: serial("id").primaryKey(),
  paymentType: paymentTypeEnum("type").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
  customerId: uuid("customer_id").references(() => customersDB.id),
  createdByEmployeeId: uuid("created_by_employee_id").references(
    () => employeesDB.id
  ),
});

export const ORDERS_DB_COLUMNS = [
  "id",
  "paymentType",
  "createdAt",
  "updatedAt",
  "shopId",
  "ownerId",
  "customerId",
  "createdByEmployeeId",
] as const;

export const ordersRelations = relations(ordersDB, ({ one, many }) => ({
  shop: one(shopsDB, {
    fields: [ordersDB.shopId],
    references: [shopsDB.id],
  }),
  owner: one(ownersDB, {
    fields: [ordersDB.ownerId],
    references: [ownersDB.id],
  }),
  customer: one(customersDB, {
    fields: [ordersDB.customerId],
    references: [customersDB.id],
  }),
  createdByEmployee: one(employeesDB, {
    fields: [ordersDB.createdByEmployeeId],
    references: [employeesDB.id],
  }),

  items: many(orderItemsDB),
}));

export type TOrderDB = typeof ordersDB.$inferSelect;
export type TNewOrderDB = typeof ordersDB.$inferInsert;

export const ORDER_PAYMENT_TYPES = paymentTypeEnum.enumValues;
