import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";
import { employees } from "./employees";
import { shops } from "./shops";

export const owners = pgTable("owners", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: text("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ownersRelations = relations(owners, ({ many }) => ({
  employees: many(employees),
  shops: many(shops),
}));

export type Owner = InferModel<typeof owners>;
