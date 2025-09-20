import { object, string, InferType } from "yup";
import { TProductVariantData } from "./product-variant.js";
import { TCategoryData } from "./category.js";

export const ProductFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(1, "Name must be at least 1 characters")
    .required("Name is required"),

  tamilName: string().trim().nullable(),
  description: string().trim().nullable(),
  categoryId: string().trim().nullable(),
  image: string().nullable(),
});

export type TProductFormSchema = InferType<typeof ProductFormSchema>;
export type TProductData = TProductFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
  variants?: TProductVariantData[];
  category?: TCategoryData;
};
