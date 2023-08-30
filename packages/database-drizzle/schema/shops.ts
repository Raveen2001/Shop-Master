import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { employeesDB } from "./employees";
import { ownersDB } from "./owners";

export const shopsDB = pgTable(
  "shops",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    domain: text("domain").notNull().default(""),
    phone: varchar("phone", { length: 10 }).notNull(),
    email: varchar("email", { length: 256 }),
    address: text("address").notNull(),
    description: text("description").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    website: text("website"),
    ownerId: uuid("ownerId")
      .notNull()
      .references(() => ownersDB.id),
  },
  (table) => ({
    domainIdx: uniqueIndex("domain_index").on(table.domain),
  })
);

export const SHOP_DB_COLUMNS = [
  "id",
  "name",
  "phone",
  "email",
  "image",
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
