import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { brandsDB } from "./brands";
import { productCategoriesDB } from "./product_categories";
import { productSubCategoriesDB } from "./product_sub_categories";
import { InferModel, relations } from "drizzle-orm";

export const productReviewsDB = pgTable("product_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
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
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
  })
);

export type TProductReviewsDB = InferModel<typeof productReviewsDB>;
