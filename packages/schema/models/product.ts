import { object, string, InferType } from "yup";
import { TProductVariantData } from "./product-variant.js";
import { TCategoryData } from "./category.js";
import { TSubCategoryData } from "./sub-category.js";
import { TBrandData } from "./brand.js";

export const ProductFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  description: string().trim().nullable(),

  brandId: string().trim().nullable(),
  categoryId: string().trim().nullable(),
  subCategoryId: string().trim().nullable(),
});

export type TProductFormSchema = InferType<typeof ProductFormSchema>;
export type TProductData = TProductFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
  variants?: TProductVariantData[];
  category?: TCategoryData;
  subCategory?: TSubCategoryData;
  brand?: TBrandData;
};
