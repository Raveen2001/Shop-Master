import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { productCategoriesDB } from "./product_categories";
import { InferModel, relations } from "drizzle-orm";
import { productsDB } from "./products";

export const productSubCategoriesDB = pgTable("product_sub_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  image: text("image"),
});

export const productSubCategoriesRelation = relations(
  productSubCategoriesDB,
  ({ one, many }) => ({
    category: one(productCategoriesDB, {
      fields: [productSubCategoriesDB.categoryId],
      references: [productCategoriesDB.id],
    }),

    products: many(productsDB),
  })
);

export type TProductSubCategoriesDB = InferModel<typeof productSubCategoriesDB>;
