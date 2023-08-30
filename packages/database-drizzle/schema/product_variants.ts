import { InferModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { productsDB } from "./products";
import { shopsDB } from "./shops";
import { ownersDB } from "./owners";

export const productVariantsDB = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  name: uuid("name").notNull(),
  acquiredPrice: integer("acquired_price").notNull(),
  salePrice: integer("sale_price").notNull(),
  otherRetailerPrice: integer("other_retailer_price").notNull(),
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

export type TProductVariantsDB = InferModel<typeof productVariantsDB>;
