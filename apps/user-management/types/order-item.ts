import { Static, Type } from "@sinclair/typebox";
import { OrderSchema } from "./order";
import { ProductVariantSchema } from "./product-variant";

export const OrderItemSchema = Type.Object({
  id: Type.String(),
  orderId: Type.String(),
  productVariantId: Type.String(),
  quantity: Type.Number(),
  unitPrice: Type.Number(),
  discount: Type.Number(),
});

export const OrderItemSchemaIn = Type.Omit(OrderItemSchema, ["id"]);
export const OrderItemForOrderSchema = Type.Omit(OrderItemSchemaIn, [
  "orderId",
]);
export const OrderItemSchemaOut = Type.Intersect([
  OrderSchema,
  Type.Object({
    productVariant: Type.Optional(ProductVariantSchema),
    order: Type.Optional(OrderSchema),
  }),
]);

export type TOrderItemSchema = Static<typeof OrderItemSchema>;
export type TOrderItemSchemaIn = Static<typeof OrderItemSchemaIn>;
export type TOrderItemForOrderSchema = Static<typeof OrderItemForOrderSchema>;

export const OrderItemQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const OrderItemQueryStringSchema = Type.Object({
  includeProductVariant: Type.Boolean({ default: false }),
  includeOrder: Type.Boolean({ default: false }),
});

export type TOrderItemQueryParam = Static<typeof OrderItemQueryParamSchema>;

export type TOrderItemQueryString = Static<typeof OrderItemQueryStringSchema>;
