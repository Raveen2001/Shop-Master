import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const brandsDB = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const brandsRelation = relations(brandsDB, ({ many, one }) => ({
  products: many(productsDB),
  shop: one(shopsDB, {
    fields: [brandsDB.shopId],
    references: [shopsDB.id],
  }),

  owner: one(ownersDB, {
    fields: [brandsDB.ownerId],
    references: [ownersDB.id],
  }),
}));

export type TBrandsDB = typeof brandsDB.$inferSelect;
export type TNewBrandDB = typeof brandsDB.$inferInsert;
