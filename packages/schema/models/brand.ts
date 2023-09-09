import { object, string, InferType } from "yup";

export const BrandFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  image: string().url("Image must be a valid URL").nullable(),
});

export type TBrandFormSchema = InferType<typeof BrandFormSchema>;
export type TBrandData = TBrandFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
