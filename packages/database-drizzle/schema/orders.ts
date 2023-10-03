import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  serial,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { ownersDB } from "./owners";
import { shopsDB } from "./shops";
import { customersDB } from "./customers";
import { employeesDB } from "./employees";
import { orderItemsDB } from "./order_items";

export const orderTypeEnum = pgEnum("order_type", ["OFFLINE", "ONLINE"]);
export const orderStatusEnum = pgEnum("order_status", ["COMPLETED", "DRAFT"]);

export const ordersDB = pgTable("orders", {
  id: serial("id").primaryKey(),

  status: orderStatusEnum("status").default("DRAFT").notNull(),
  type: orderTypeEnum("type").default("OFFLINE").notNull(),

  tax: integer("tax").notNull(),
  delivery: integer("delivery").notNull(),
  discount: integer("discount").notNull(),
  subTotal: integer("sub_total").notNull(),
  total: integer("total").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
  customerPhone: text("customer_phone").references(() => customersDB.phone),
  createdByEmployeeId: uuid("created_by_employee_id").references(
    () => employeesDB.id
  ),
});

export const ORDERS_DB_COLUMNS = [
  "id",

  "type",
  "status",

  "tax",
  "delivery",
  "discount",
  "subTotal",
  "total",

  "createdAt",
  "updatedAt",

  "shopId",
  "ownerId",
  "customerPhone",
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
    fields: [ordersDB.customerPhone],
    references: [customersDB.phone],
  }),
  createdByEmployee: one(employeesDB, {
    fields: [ordersDB.createdByEmployeeId],
    references: [employeesDB.id],
  }),

  items: many(orderItemsDB),
}));

export type TOrderDB = typeof ordersDB.$inferSelect;
export type TNewOrderDB = typeof ordersDB.$inferInsert;

export const ORDER_TYPES = orderTypeEnum.enumValues;
export const ORDER_STATUS = orderStatusEnum.enumValues;
