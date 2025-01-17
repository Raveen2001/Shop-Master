import { TProductData } from "./product";
import { object, string, InferType, number, boolean } from "yup";

export const ProductVariantFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  productId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  acquiredPrice: number()
    .required("Acquired Price is required")
    .min(1, "Acquired Price must be at least 1"),
  salePrice: number()
    .required("Sale Price is required")
    .min(1, "Sale Price must be at least 1"),
  mrp: number().required("MRP is required").min(1, "MRP must be at least 1"),
  onlyForBilling: boolean().default(false),
  availability: boolean().default(true),
});

export type TProductVariantFormSchema = InferType<
  typeof ProductVariantFormSchema
>;
export type TProductVariantData = TProductVariantFormSchema & {
  id: string;
};

export type TProductVariantWithDetails = TProductVariantData & {
  product: TProductData;
};
