import { relations } from "drizzle-orm";
import { pgTable, uuid, decimal, serial, text } from "drizzle-orm/pg-core";
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

  // Custom product name for this order item (overrides product variant name)
  customProductName: text("custom_product_name"),

  quantity: decimal("quantity").notNull(),

  acquiredPrice: decimal("acquired_price").notNull(),
  mrp: decimal("mrp").notNull(),
  unitPrice: decimal("unit_price").notNull(),
  totalPrice: decimal("total_price").notNull(),
  discount: decimal("discount").notNull(),
});

export const ORDER_ITEMS_DB_COLUMNS = [
  "id",
  "orderId",
  "productVariantId",
  "customProductName",
  "quantity",
  "unitPrice",
  "totalPrice",
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
