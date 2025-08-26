import { relations } from "drizzle-orm";
import { pgTable, uuid, integer, serial } from "drizzle-orm/pg-core";
import { ordersDB } from "./orders";
import { productVariantsDB } from "./product_variants";

export const orderItemsDB = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  orderId: serial("order_id")
    .notNull()
    .references(() => ordersDB.id),

  productVariantId: uuid("product_variant_id").references(
    () => productVariantsDB.id
  ),

  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  totalPrice: integer("total_price").default(0).notNull(),
  discount: integer("discount").notNull(),
});

export const ORDER_ITEMS_DB_COLUMNS = [
  "id",
  "orderId",
  "productVariantId",
  "quantity",
  "unitPrice",
  "discount",
] as const;

export const orderItemsRelations = relations(orderItemsDB, ({ one }) => ({
  order: one(ordersDB, {
    fields: [orderItemsDB.orderId],
    references: [ordersDB.id],
  }),
  productVariant: one(productVariantsDB, {
    fields: [orderItemsDB.productVariantId],
    references: [productVariantsDB.id],
  }),
}));

export type TOrderItemDB = typeof orderItemsDB.$inferSelect;
export type TNewOrderItemDB = typeof orderItemsDB.$inferInsert;
