import { CUSTOMER_TYPES } from "./../../database-drizzle/schema/customers";
import { object, string, InferType } from "yup";

export const CustomerFormSchema = object({
  name: string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  phone: string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .nullable(),
  email: string().email("Email should be valid").lowercase().nullable(),
  image: string().url("Image should be valid").nullable(),

  type: string()
    .oneOf(CUSTOMER_TYPES, "Type should be valid")
    .required("Customer type is required"),
  address: string()
    .min(3, "Address must be atleast 3 characters")
    .required("Address is required"),

  shopId: string().required(),
  ownerId: string().required(),
  createdByEmployeeId: string().nullable(),
});

export type TCustomerFormSchema = InferType<typeof CustomerFormSchema>;
export type TCustomerData = TCustomerFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export { CUSTOMER_TYPES };
