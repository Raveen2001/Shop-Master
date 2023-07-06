import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { employeesDB } from "./employees";
import { shopsDB } from "./shops";

export const ownersDB = pgTable("owners", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: text("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ownersRelations = relations(ownersDB, ({ many }) => ({
  employees: many(employeesDB),
  shops: many(shopsDB),
}));

export type Owner = InferModel<typeof ownersDB>;
