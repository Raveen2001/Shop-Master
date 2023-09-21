import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  text,
} from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productVariantsDB = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  name: text("name").notNull(),
  onlyForBilling: boolean("only_for_billing").default(false),
  acquiredPrice: integer("acquired_price").notNull(),
  salePrice: integer("sale_price").notNull(),
  mrp: integer("mrp").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  availability: boolean("availability").default(true),

  shopId: uuid("shop_id")
    .notNull()
    .references(() => shopsDB.id),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => ownersDB.id),
});

export const productVariantsRelation = relations(
  productVariantsDB,
  ({ one }) => ({
    product: one(productsDB, {
      fields: [productVariantsDB.productId],
      references: [productsDB.id],
    }),

    shop: one(shopsDB, {
      fields: [productVariantsDB.shopId],
      references: [shopsDB.id],
    }),

    owner: one(ownersDB, {
      fields: [productVariantsDB.ownerId],
      references: [ownersDB.id],
    }),
  })
);

export type TProductVariantsDB = typeof productVariantsDB.$inferSelect;
export type TNewProductVariantsDB = typeof productVariantsDB.$inferInsert;
