import { Static, Type } from "@sinclair/typebox";
import { OwnerSchemaWithoutPassword } from "./owner.js";
import { optionalType } from "./utils.js";
import { ShopSchemaOut } from "./shop.js";

export const SubCategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  image: optionalType(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  ownerId: Type.String(),
  shopId: Type.String(),
});

export const SubCategorySchemaIn = Type.Omit(SubCategorySchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const SubCategorySchemaOut = Type.Intersect([
  SubCategorySchema,
  Type.Object({
    shop: Type.Optional(ShopSchemaOut),
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    // TODO: add products
    // products: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);

export type TSubCategorySchema = Static<typeof SubCategorySchema>;
export type TSubCategoryIn = Static<typeof SubCategorySchemaIn>;
export type TSubCategoryOut = Static<typeof SubCategorySchemaOut>;

export const SubCategoryQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const SubCategoryQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeProducts: Type.Boolean({ default: false }),
});

export type TSubCategoryQueryParam = Static<typeof SubCategoryQueryParamSchema>;
export type TSubCategoryQueryString = Static<
  typeof SubCategoryQueryStringSchema
>;

export type TSubCategoryQueryByFields = "ownerId" | "shopId";
