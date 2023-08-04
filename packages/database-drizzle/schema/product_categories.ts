import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const productCategoriesDB = pgTable("product_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
});
