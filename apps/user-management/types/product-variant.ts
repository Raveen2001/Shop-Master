import { Static, Type } from "@sinclair/typebox";

export const ProductVariantSchema = Type.Object({
  id: Type.String(),
  productId: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  acquiredPrice: Type.Number(),
  salePrice: Type.Number(),
  otherRetailerPrice: Type.Number(),
  onlyForBilling: Type.Boolean({ default: false }),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  availability: Type.Boolean({ default: true }),
  shopId: Type.String(),
  ownerId: Type.String(),
});

export const ProductVariantSchemaIn = Type.Omit(ProductVariantSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type TProductVariantSchema = Static<typeof ProductVariantSchema>;
export type TProductVariantSchemaIn = Static<typeof ProductVariantSchemaIn>;

export const ProductVariantQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const ProductVariantQueryStringSchema = Type.Object({
  includeProduct: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeOwner: Type.Boolean({ default: false }),
});

export type TProductVariantQueryParam = Static<
  typeof ProductVariantQueryParamSchema
>;

export type TProductVariantQueryString = Static<
  typeof ProductVariantQueryStringSchema
>;

export type TProductVariantQueryByFields = "ownerId" | "shopId";
