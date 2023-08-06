import { InferModel, relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { productsDB } from "./products";

export const productImagesDB = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productImagesRelation = relations(productImagesDB, ({ one }) => ({
  product: one(productsDB, {
    fields: [productImagesDB.productId],
    references: [productsDB.id],
  }),
}));

export type TProductImagesDB = InferModel<typeof productImagesDB>;
