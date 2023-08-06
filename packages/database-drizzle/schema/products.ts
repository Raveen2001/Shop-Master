import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { brandsDB } from "./brands";
import { productCategoriesDB } from "./product_categories";
import { productSubCategoriesDB } from "./product_sub_categories";

export const productsDB = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brandsDB.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),
  subCategoryId: uuid("sub_category_id")
    .notNull()
    .references(() => productSubCategoriesDB.id),

  onlyForBilling: boolean("only_for_billing").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
