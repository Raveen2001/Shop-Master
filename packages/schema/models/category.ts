import { object, string, InferType } from "yup";
import { TSubCategoryData } from "./sub-category";

export const CategoryFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  image: string().url("Image must be a valid URL").nullable(),
});

export type TCategoryFormSchema = InferType<typeof CategoryFormSchema>;
export type TCategoryData = TCategoryFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;

  subCategories?: TSubCategoryData[];
};
