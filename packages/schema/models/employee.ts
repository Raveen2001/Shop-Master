import { EMPLOYEE_TYPES } from "../../database-drizzle/schema/employees";
import { object, string, mixed, InferType } from "yup";

export const EmployeeFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  name: string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  username: string()
    .min(3, "Username must be at least 3 characters")
    .trim()
    .lowercase()
    .required("Username is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .trim()
    .required("Password is required"),
  phone: string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: string()
    .email("Email should be valid")
    .required("Email is required")
    .lowercase(),

  image: string().url("Image should be valid").required().nullable(),
  type: mixed()
    .oneOf(EMPLOYEE_TYPES, "Type should be valid")
    .required("Employee type is required"),
  address: string().required(),
});

export type IEmployeeFormSchema = InferType<typeof EmployeeFormSchema>;
export type IEmployeeData = IEmployeeFormSchema & {
  id: string;
  createdAt: string;
};
