import { object, string, InferType } from "yup";

export const SubCategoryFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  categoryId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  image: string().url("Image must be a valid URL").nullable(),
});

export type TSubCategoryFormSchema = InferType<typeof SubCategoryFormSchema>;
export type TSubCategoryData = TSubCategoryFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
