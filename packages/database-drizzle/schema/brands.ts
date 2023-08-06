import { InferModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsDB } from "./products";

export const brandsDB = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const brandsRelation = relations(brandsDB, ({ many }) => ({
  products: many(productsDB),
}));

export type TBrandsDB = InferModel<typeof brandsDB>;
