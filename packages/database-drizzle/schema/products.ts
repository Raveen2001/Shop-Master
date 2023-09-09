import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { brandsDB } from "./brands";
import { productCategoriesDB } from "./product_categories";
import { productSubCategoriesDB } from "./product_sub_categories";
import { productReviewsDB } from "./product_reviews";
import { productSearchTagsDB } from "./product_search_tags";
import { productVariantsDB } from "./product_variants";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productsDB = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  brandId: uuid("brand_id").references(() => brandsDB.id),
  categoryId: uuid("category_id").references(() => productCategoriesDB.id),
  subCategoryId: uuid("sub_category_id").references(
    () => productSubCategoriesDB.id
  ),

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
  brand: one(brandsDB, {
    fields: [productsDB.brandId],
    references: [brandsDB.id],
  }),

  category: one(productCategoriesDB, {
    fields: [productsDB.categoryId],
    references: [productCategoriesDB.id],
  }),

  subCategory: one(productSubCategoriesDB, {
    fields: [productsDB.subCategoryId],
    references: [productSubCategoriesDB.id],
  }),

  productSearchTags: many(productSearchTagsDB),

  productReviews: many(productReviewsDB),

  productVariants: many(productVariantsDB),

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
