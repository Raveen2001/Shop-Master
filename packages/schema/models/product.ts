import { object, string, InferType } from "yup";

export const ProductFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  description: string().trim().nullable(),

  brandId: string().required("Product is required"),
  categoryId: string().required("Category is required"),
  subCategoryId: string().required("Sub Category is required"),
});

export type TProductFormSchema = InferType<typeof ProductFormSchema>;
export type TProductData = TProductFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
