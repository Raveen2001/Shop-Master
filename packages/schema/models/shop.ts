import { object, string, InferType } from "yup";

export const ShopFormSchema = object({
  ownerId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  domain: string()
    .trim()
    .lowercase()
    .min(3, "Domain must be at least 3 characters")
    .required("Domain is required"),
  phone: string()
    .trim()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: string().trim().email("Email should be valid").lowercase().nullable(),

  image: string().url("Image should be valid").nullable(),
  website: string().url("Website should be valid").lowercase().nullable(),
  description: string()
    .min(3, "Description must be 3 characters")
    .required("Description is required"),
  address: string()
    .min(3, "Address must be atleast 3 characters")
    .required("Address is required"),
});

export type TShopFormSchema = InferType<typeof ShopFormSchema>;
export type TShopData = TShopFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
