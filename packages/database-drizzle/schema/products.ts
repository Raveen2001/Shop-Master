import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { productCategoriesDB } from "./product_categories";

import { productReviewsDB } from "./product_reviews";
import { productSearchTagsDB } from "./product_search_tags";
import { productVariantsDB } from "./product_variants";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productsDB = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productsRelations = relations(productsDB, ({ one, many }) => ({
  category: one(productCategoriesDB, {
    fields: [productsDB.categoryId],
    references: [productCategoriesDB.id],
  }),

  searchTags: many(productSearchTagsDB),

  reviews: many(productReviewsDB),

  variants: many(productVariantsDB),

  shop: one(shopsDB, {
    fields: [productsDB.shopId],
    references: [shopsDB.id],
  }),

  owner: one(ownersDB, {
    fields: [productsDB.ownerId],
    references: [ownersDB.id],
  }),
}));

export type TProductsDB = typeof productsDB.$inferSelect;
export type TNewProductsDB = typeof productsDB.$inferInsert;
