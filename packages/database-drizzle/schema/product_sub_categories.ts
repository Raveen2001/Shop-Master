import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { productCategoriesDB } from "./product_categories";

export const productSubCategoriesDB = pgTable("product_sub_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => productCategoriesDB.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  image: text("image"),
});
