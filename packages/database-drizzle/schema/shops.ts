import { InferModel, relations } from "drizzle-orm";
import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { employeesDB } from "./employees";
import { ownersDB } from "./owners";

export const shopsDB = pgTable("shops", {
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
    .references(() => ownersDB.id),
});

export const SHOP_DB_COLUMNS = [
  "id",
  "name",
  "phone",
  "email",
  "address",
  "description",
  "createdAt",
  "website",
  "ownerId",
] as const;

export const shopsRelations = relations(shopsDB, ({ many, one }) => ({
  employees: many(employeesDB),
  owner: one(ownersDB, {
    fields: [shopsDB.ownerId],
    references: [ownersDB.id],
  }),
}));

export type Shop = InferModel<typeof shopsDB>;
