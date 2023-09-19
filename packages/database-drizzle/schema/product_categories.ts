import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";
import { productSubCategoriesDB } from "./product_sub_categories";

export const productCategoriesDB = pgTable("product_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productCategoriesRelation = relations(
  productCategoriesDB,
  ({ many, one }) => ({
    products: many(productsDB),
    subCategories: many(productSubCategoriesDB),
    shop: one(shopsDB, {
      fields: [productCategoriesDB.shopId],
      references: [shopsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [productCategoriesDB.ownerId],
      references: [ownersDB.id],
    }),
  })
);

export type TProductCategoryDB = typeof productCategoriesDB.$inferSelect;
export type TNewProductCategoryDB = typeof productCategoriesDB.$inferInsert;
