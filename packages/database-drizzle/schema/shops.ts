import { InferModel, relations } from "drizzle-orm";
import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { employees } from "./employees";
import { owners } from "./owners";

export const shops = pgTable("shops", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  email: varchar("email", { length: 256 }),
  address: text("address").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  website: text("website"),
  ownerId: uuid("ownerId")
    .notNull()
    .references(() => owners.id),
});

export const shopsRelations = relations(shops, ({ many, one }) => ({
  employees: many(employees),
  owner: one(owners, { fields: [shops.ownerId], references: [owners.id] }),
}));

export type Shop = InferModel<typeof shops>;
