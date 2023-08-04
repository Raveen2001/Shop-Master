import { InferModel, relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { employeesDB } from "./employees";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const customerPaymentTypeEnum = pgEnum("customer_payment_types", [
  "CREDIT",
  "DEBIT",
]);

export const employeePaymentsDB = pgTable("employee_payments", {
  id: uuid("id").defaultRandom().primaryKey(),

  type: customerPaymentTypeEnum("type").notNull(),
  amount: integer("amount").notNull(),
  comment: text("comment"),

  createdAt: timestamp("created_at").notNull().defaultNow(),

  createdByEmployeeId: uuid("created_by_employee_id").references(
    () => employeesDB.id
  ),

  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employeesDB.id),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const EMPLOYEE_PAYEMENT_DB_COLUMNS = [
  "id",
  "type",
  "amount",
  "comment",
  "createdAt",
  "createdByEmployeeId",
  "employeeId",
  "shopId",
  "ownerId",
] as const;

export type TEMPLOYEE_PAYMENT_QUERY_BY_FIELDS =
  | "employeeId"
  | "ownerId"
  | "shopId"
  | "createdByEmployeeId";

export const employeePaymentsRelations = relations(
  employeePaymentsDB,
  ({ one }) => ({
    createdByEmployee: one(employeesDB, {
      fields: [employeePaymentsDB.createdByEmployeeId],
      references: [employeesDB.id],
    }),

    employee: one(employeesDB, {
      fields: [employeePaymentsDB.employeeId],
      references: [employeesDB.id],
    }),

    shop: one(shopsDB, {
      fields: [employeePaymentsDB.shopId],
      references: [shopsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [employeePaymentsDB.ownerId],
      references: [ownersDB.id],
    }),
  })
);

export type TEmployeePaymentDB = InferModel<typeof employeesDB>;

export const EMPLOYEE_PAYEMENT_TYPES = customerPaymentTypeEnum.enumValues;
