import { InferModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const brandsDB = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type TBrandsDB = InferModel<typeof brandsDB>;
