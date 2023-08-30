import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productImagesDB = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productImagesRelation = relations(productImagesDB, ({ one }) => ({
  product: one(productsDB, {
    fields: [productImagesDB.productId],
    references: [productsDB.id],
  }),

  shop: one(shopsDB, {
    fields: [productImagesDB.shopId],
    references: [shopsDB.id],
  }),

  owner: one(ownersDB, {
    fields: [productImagesDB.ownerId],
    references: [ownersDB.id],
  }),
}));

export type TProductImagesDB = typeof productImagesDB.$inferSelect;
export type TNewProductImageDB = typeof productImagesDB.$inferInsert;
