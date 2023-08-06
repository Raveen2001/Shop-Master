import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

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
});
