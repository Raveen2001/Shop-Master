import { InferModel, relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { employeesDB } from "./employees";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const employeePaymentTypeEnum = pgEnum("employee_payment_types", [
  "SALARY",
  "ADVANCE",
  "BONUS",
  "PRODUCT_PURCHASE",
  "OTHERS",
]);

export const employeePaymentsDB = pgTable("employee_payments", {
  id: uuid("id").defaultRandom().primaryKey(),

  type: employeePaymentTypeEnum("type").notNull(),
  amount: numeric("amount").notNull(),
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
];

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

export type TEmployeeDB = InferModel<typeof employeesDB>;

export const EMPLOYEE_PAYEMENT_TYPES = employeePaymentTypeEnum.enumValues;
