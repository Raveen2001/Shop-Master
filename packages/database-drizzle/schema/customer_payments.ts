import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";
import { customersDB } from "./customers";
import { employeesDB } from "./employees";

export const customerPaymentTypeEnum = pgEnum("customer_payment_type", [
  "BALANCE",
]);

export const customerPaymentsDB = pgTable("customer_payments", {
  id: uuid("id").defaultRandom().primaryKey(),

  type: customerPaymentTypeEnum("type").notNull(),
  amount: integer("amount").notNull(),
  comment: text("comment"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  createdByEmployeeId: uuid("created_by_employee_id").references(
    () => employeesDB.id
  ),

  customerId: uuid("customer_id")
    .notNull()
    .references(() => customersDB.id),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const CUSTOMER_PAYEMENT_DB_COLUMNS = [
  "id",
  "type",
  "amount",
  "comment",
  "createdAt",
  "updatedAt",
  "createdByEmployeeId",
  "customerId",
  "shopId",
  "ownerId",
] as const;

export type TCUSTOMER_PAYMENT_QUERY_BY_FIELDS =
  | "customerId"
  | "ownerId"
  | "shopId"
  | "createdByEmployeeId";

export const customerPaymentsRelations = relations(
  customerPaymentsDB,
  ({ one }) => ({
    createdByEmployee: one(customerPaymentsDB, {
      fields: [customerPaymentsDB.createdByEmployeeId],
      references: [customerPaymentsDB.id],
    }),

    customer: one(customersDB, {
      fields: [customerPaymentsDB.customerId],
      references: [customersDB.id],
    }),

    shop: one(shopsDB, {
      fields: [customerPaymentsDB.shopId],
      references: [shopsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [customerPaymentsDB.ownerId],
      references: [ownersDB.id],
    }),
  })
);

export type TCustomerPaymentDB = typeof customerPaymentsDB.$inferSelect;
export type TNewCustomerPaymentDB = typeof customerPaymentsDB.$inferInsert;

export const CUSTOMER_PAYEMENT_TYPES = customerPaymentTypeEnum.enumValues;
