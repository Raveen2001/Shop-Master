import { Static, Type } from "@sinclair/typebox";
import { optionalType } from "./utils.js";

export const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  image: optionalType(Type.String({ format: "uri" })),
  parentId: optionalType(Type.String()),
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
    subCategories: Type.Optional(Type.Array(CategorySchema)),
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
  includeProducts: Type.Boolean({ default: false }),
  includeSubCategories: Type.Boolean({ default: false }),
});

export type TCategoryQueryParam = Static<typeof CategoryQueryParamSchema>;
export type TCategoryQueryString = Static<typeof CategoryQueryStringSchema>;

export type TCategoryQueryByFields = "ownerId" | "shopId";
