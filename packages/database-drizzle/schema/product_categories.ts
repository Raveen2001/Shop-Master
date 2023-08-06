import { InferModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsDB } from "./products";

export const productCategoriesDB = pgTable("product_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productCategoriesRelation = relations(
  productCategoriesDB,
  ({ many }) => ({
    products: many(productsDB),
  })
);

export type TProductCategoriesDB = InferModel<typeof productCategoriesDB>;
