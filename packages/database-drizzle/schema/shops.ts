import { relations } from "drizzle-orm";
import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { employees } from "./employees";
import { owners } from "./owners";

export const shops = pgTable("shops", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  email: varchar("email", { length: 256 }),
  address: text("address").notNull(),
  description: text("description"),
  website: text("website"),
  ownerId: uuid("ownerId")
    .notNull()
    .references(() => owners.id),
});

export const shopsRelations = relations(shops, ({ many }) => ({
  employees: many(employees),
}));
