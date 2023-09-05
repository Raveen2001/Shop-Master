import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";
import { productVariantsDB } from "./product_variants";

export const productImagesDB = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productVariantId: uuid("product_variant_id")
    .notNull()
    .references(() => productVariantsDB.id),
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
  product: one(productVariantsDB, {
    fields: [productImagesDB.productVariantId],
    references: [productVariantsDB.id],
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
