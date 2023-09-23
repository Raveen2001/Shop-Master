import { Static, Type } from "@sinclair/typebox";

export const OrderSchema = Type.Object({
  id: Type.String(),
  paymentType: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  shopId: Type.String(),
  ownerId: Type.String(),
  customerId: Type.String(),
  createdByEmployeeId: Type.String(),
});

export const OrderSchemaIn = Type.Omit(OrderSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type TOrderSchema = Static<typeof OrderSchema>;
export type TOrderSchemaIn = Static<typeof OrderSchemaIn>;

export const OrderQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const OrderQueryStringSchema = Type.Object({
  includeShop: Type.Boolean({ default: false }),
  includeOwner: Type.Boolean({ default: false }),
  includeCustomer: Type.Boolean({ default: false }),
  includeCreatedByEmployee: Type.Boolean({ default: false }),
});

export type TOrderQueryParam = Static<typeof OrderQueryParamSchema>;

export type TOrderQueryString = Static<typeof OrderQueryStringSchema>;
