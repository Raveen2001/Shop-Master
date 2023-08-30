import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { relations } from "drizzle-orm";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productSearchTagsDB = pgTable("product_search_tags", {
  id: uuid("id").defaultRandom().primaryKey(),

  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  productId: uuid("product_id")
    .notNull()
    .references(() => productsDB.id),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productSearchTagsRelation = relations(
  productSearchTagsDB,
  ({ one }) => ({
    product: one(productsDB, {
      fields: [productSearchTagsDB.productId],
      references: [productsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [productSearchTagsDB.ownerId],
      references: [ownersDB.id],
    }),

    shop: one(shopsDB, {
      fields: [productSearchTagsDB.shopId],
      references: [shopsDB.id],
    }),
  })
);

export type TProductSearchTagsDB = typeof productSearchTagsDB.$inferSelect;
export type TNewProductSearchTagsDB = typeof productSearchTagsDB.$inferInsert;
