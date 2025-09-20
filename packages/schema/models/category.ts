import { object, string, InferType } from "yup";

export const CategoryFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(1, "Name must be at least 1 characters")
    .required("Name is required"),

  tamilName: string().trim().nullable(),
  image: string().nullable(),
  parentId: string().nullable(),
});

export type TCategoryFormSchema = InferType<typeof CategoryFormSchema>;
export type TCategoryData = TCategoryFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;

  subCategories?: TCategoryData[];
};
