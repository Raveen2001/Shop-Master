import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { employeesDB } from "./employees";
import { shopsDB } from "./shops";

export const ownersDB = pgTable(
  "owners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    phone: varchar("phone", { length: 10 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: text("password").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex("email_index").on(table.email),
  })
);

export const ownersRelations = relations(ownersDB, ({ many }) => ({
  employees: many(employeesDB),
  shops: many(shopsDB),
}));

export type TOwnerDB = typeof ownersDB.$inferSelect;
export type TNewOwnerDB = typeof ownersDB.$inferInsert;
