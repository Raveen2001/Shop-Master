import { EMPLOYEE_TYPES } from "../../database-drizzle/schema/employees";
import { object, string, mixed, InferType } from "yup";

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
  email: string()
    .trim()
    .email("Email should be valid")
    .required("Email is required")
    .lowercase(),

  image: string().url("Image should be valid").required().nullable(),
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
