import { Static, Type } from "@sinclair/typebox";

export const OrderItemSchema = Type.Object({
  id: Type.String(),
  productVariantId: Type.String(),
  quantity: Type.Number(),
  unitPrice: Type.Number(),
  orderId: Type.String(),
});

export const OrderItemSchemaIn = Type.Omit(OrderItemSchema, ["id"]);

export type TOrderItemSchema = Static<typeof OrderItemSchema>;
export type TOrderItemSchemaIn = Static<typeof OrderItemSchemaIn>;

export const OrderItemQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const OrderItemQueryStringSchema = Type.Object({
  includeOrderItem: Type.Boolean({ default: false }),
  includeOrder: Type.Boolean({ default: false }),
});

export type TOrderItemQueryParam = Static<typeof OrderItemQueryParamSchema>;

export type TOrderItemQueryString = Static<typeof OrderItemQueryStringSchema>;
