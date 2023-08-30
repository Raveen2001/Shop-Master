import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { brandsDB } from "./brands";
import { productCategoriesDB } from "./product_categories";
import { productSubCategoriesDB } from "./product_sub_categories";
import { InferModel, relations } from "drizzle-orm";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productReviewsDB = pgTable("product_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  userId: uuid("user_id").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productsDB.id),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brandsDB.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => productSubCategoriesDB.id),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productReviewsRelations = relations(
  productReviewsDB,
  ({ one }) => ({
    product: one(productsDB, {
      fields: [productReviewsDB.productId],
      references: [productsDB.id],
    }),
    brand: one(brandsDB, {
      fields: [productReviewsDB.brandId],
      references: [brandsDB.id],
    }),
    category: one(productCategoriesDB, {
      fields: [productReviewsDB.categoryId],
      references: [productCategoriesDB.id],
    }),

    subCategory: one(productSubCategoriesDB, {
      fields: [productReviewsDB.subCategoryId],
      references: [productSubCategoriesDB.id],
    }),

    shop: one(shopsDB, {
      fields: [productReviewsDB.shopId],
      references: [shopsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [productReviewsDB.ownerId],
      references: [ownersDB.id],
    }),
  })
);

export type TProductReviewsDB = typeof productReviewsDB.$inferSelect;
export type TNewProductReviewDB = typeof productReviewsDB.$inferInsert;
