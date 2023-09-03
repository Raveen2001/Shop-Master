import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { productCategoriesDB } from "./product_categories";
import { relations } from "drizzle-orm";
import { productsDB } from "./products";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productSubCategoriesDB = pgTable("product_sub_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  image: text("image"),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productSubCategoriesRelation = relations(
  productSubCategoriesDB,
  ({ one, many }) => ({
    category: one(productCategoriesDB, {
      fields: [productSubCategoriesDB.categoryId],
      references: [productCategoriesDB.id],
    }),

    shop: one(shopsDB, {
      fields: [productSubCategoriesDB.shopId],
      references: [shopsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [productSubCategoriesDB.ownerId],
      references: [ownersDB.id],
    }),

    products: many(productsDB),
  })
);

export type TProductSubCategoryDB = typeof productSubCategoriesDB.$inferSelect;
export type TNewProductSubCategoryDB =
  typeof productSubCategoriesDB.$inferInsert;
