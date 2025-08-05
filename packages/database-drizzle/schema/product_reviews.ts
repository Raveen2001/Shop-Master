import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { productCategoriesDB } from "./product_categories";
import { relations } from "drizzle-orm";
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

  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),

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

    category: one(productCategoriesDB, {
      fields: [productReviewsDB.categoryId],
      references: [productCategoriesDB.id],
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
