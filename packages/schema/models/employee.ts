import { object, string, InferType } from "yup";

const EMPLOYEE_TYPES = [
  "MANAGER",
  "CASHIER",
  "ACCOUNTANT",
  "SALESMAN",
  "DELIVERY_PERSON",
  "PARCEL_COUNTER_DEVICE",
  "BILLING_DEVICE",
] as const;

export const EmployeeFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  username: string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .lowercase()
    .required("Username is required"),
  password: string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  phone: string()
    .trim()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: string().trim().email("Email should be valid").lowercase().nullable(),

  image: string().url("Image should be valid").nullable(),
  type: string()
    .oneOf(EMPLOYEE_TYPES, "Type should be valid")
    .required("Employee type is required"),
  address: string()
    .trim()
    .min(3, "Address must be atleast 3 characters")
    .required("Address is required"),
});

export type TEmployeeFormSchema = InferType<typeof EmployeeFormSchema>;
export type TEmployeeData = TEmployeeFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export { EMPLOYEE_TYPES };
