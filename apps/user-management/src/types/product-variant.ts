import { Static, Type } from "@sinclair/typebox";
import { optionalType } from "./utils.js";

export const ProductVariantSchema = Type.Object({
  id: Type.String(),
  productId: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  tamilName: optionalType(Type.String({ minLength: 3, maxLength: 50 })),
  acquiredPrice: Type.Number(),
  salePrice: Type.Number(),
  mrp: Type.Number(),
  onlyForBilling: Type.Boolean({ default: false }),
  isLoose: Type.Boolean({ default: false }),
  noOfUnits: Type.Number(),
  unit: Type.Union([
    Type.Literal("KG"),
    Type.Literal("L"),
    Type.Literal("G"),
    Type.Literal("ML"),
    Type.Literal("PCS"),
  ]),
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
  "ownerId",
]);

export type TProductVariantSchema = Static<typeof ProductVariantSchema>;
export type TProductVariantSchemaIn = Static<typeof ProductVariantSchemaIn>;

export const ProductVariantQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const ProductVariantQueryStringSchema = Type.Object({
  includeProduct: Type.Boolean({ default: false }),
});

export type TProductVariantQueryParam = Static<
  typeof ProductVariantQueryParamSchema
>;

export type TProductVariantQueryString = Static<
  typeof ProductVariantQueryStringSchema
>;

export type TProductVariantQueryByFields = "ownerId" | "shopId";
