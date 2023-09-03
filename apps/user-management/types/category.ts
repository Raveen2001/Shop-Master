import { Static, Type } from "@sinclair/typebox";
import { OwnerSchemaWithoutPassword } from "./owner";
import { optionalType } from "./utils";
import { ShopSchemaOut } from "./shop";

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  image: optionalType(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  ownerId: Type.String(),
  shopId: Type.String(),
});

export const CategorySchemaIn = Type.Omit(CategorySchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export const CategorySchemaOut = Type.Intersect([
  CategorySchema,
  Type.Object({
    shop: Type.Optional(ShopSchemaOut),
    owner: Type.Optional(OwnerSchemaWithoutPassword),
    // TODO: add products
    // products: Type.Optional(Type.Array(EmployeeSchema)),
  }),
]);

export type TCategorySchema = Static<typeof CategorySchema>;
export type TCategoryIn = Static<typeof CategorySchemaIn>;
export type TCategoryOut = Static<typeof CategorySchemaOut>;

export const CategoryQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const CategoryQueryStringSchema = Type.Object({
  includeOwner: Type.Boolean({ default: false }),
  includeShop: Type.Boolean({ default: false }),
  includeProducts: Type.Boolean({ default: false }),
});

export type TCategoryQueryParam = Static<typeof CategoryQueryParamSchema>;
export type TCategoryQueryString = Static<typeof CategoryQueryStringSchema>;

export type TCategoryQueryByFields = "ownerId" | "shopId";
