import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { InferModel, relations } from "drizzle-orm";

export const productSearchTagsDB = pgTable("product_search_tags", {
  id: uuid("id").defaultRandom().primaryKey(),

  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  productId: uuid("product_id")
    .notNull()
    .references(() => productsDB.id),
});

export const productSearchTagsRelation = relations(
  productSearchTagsDB,
  ({ one }) => ({
    product: one(productsDB, {
      fields: [productSearchTagsDB.productId],
      references: [productsDB.id],
    }),
  })
);

export type TProductSearchTagsDB = InferModel<typeof productSearchTagsDB>;
