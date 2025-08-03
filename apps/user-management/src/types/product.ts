import { Static, Type } from "@sinclair/typebox";
import { OwnerSchemaWithoutPassword } from "./owner";
import { optionalType } from "./utils";
import { ShopSchemaOut } from "./shop";
import { ProductVariantSchema } from "./product-variant";

export const ProductSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),

  description: optionalType(Type.String()),
  brandId: optionalType(Type.String()),
  categoryId: optionalType(Type.String()),
  subCategoryId: optionalType(Type.String()),

  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),

  ownerId: Type.String(),
  shopId: Type.String(),
});

export const ProductSchemaIn = Type.Omit(ProductSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const ProductSchemaOut = Type.Intersect([
  ProductSchema,
  Type.Object({
    shop: Type.Optional(ShopSchemaOut),
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    variants: Type.Optional(Type.Array(ProductVariantSchema)),
  }),
]);

export type TProductSchema = Static<typeof ProductSchema>;
export type TProductIn = Static<typeof ProductSchemaIn>;
export type TProductOut = Static<typeof ProductSchemaOut>;

export const ProductQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const ProductQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeVariants: Type.Boolean({ default: false }),
});

export type TProductQueryParam = Static<typeof ProductQueryParamSchema>;
export type TProductQueryString = Static<typeof ProductQueryStringSchema>;

export type TProductQueryByFields = "ownerId" | "shopId";
