import { Static, Type } from "@sinclair/typebox";
import { OwnerSchemaWithoutPassword } from "./owner";
import { optionalType } from "./utils";
import { ShopSchemaOut } from "./shop";

export const BrandSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  image: optionalType(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  ownerId: Type.String(),
  shopId: Type.String(),
});

export const BrandSchemaIn = Type.Omit(BrandSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const BrandSchemaOut = Type.Intersect([
  BrandSchema,
  Type.Object({
    shop: Type.Optional(ShopSchemaOut),
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    // TODO: add products
    // products: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);

export type TBrandSchema = Static<typeof BrandSchema>;
export type TBrandIn = Static<typeof BrandSchemaIn>;
export type TBrandOut = Static<typeof BrandSchemaOut>;

export const BrandQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const BrandQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeProducts: Type.Boolean({ default: false }),
});

export type TBrandQueryParam = Static<typeof BrandQueryParamSchema>;
export type TBrandQueryString = Static<typeof BrandQueryStringSchema>;

export type TBrandQueryByFields = "ownerId" | "shopId";
