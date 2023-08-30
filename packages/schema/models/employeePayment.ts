import { object, string, mixed, InferType, number, date } from "yup";
import { TEmployeeData } from "./employee";
import { IPaginatedData } from "../common";

export const EMPLOYEE_PAYEMENT_TYPES = [
  "SALARY",
  "ADVANCE",
  "BONUS",
  "PRODUCT_PURCHASE",
  "OTHERS",
] as const;

export const EmployeePaymentFormSchema = object({
  amount: number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
  comment: string(),
  createdAt: date().required("Created at is required"),
  type: mixed()
    .oneOf(EMPLOYEE_PAYEMENT_TYPES, "Payment Type should be valid")
    .required("Payment Type is required"),
  createdByEmployeeId: string().nullable(),
  employeeId: string().required("Employee is required"),
  shopId: string().required(),
  ownerId: string().required(),
});

export type TEmployeePaymentFormSchema = InferType<
  typeof EmployeePaymentFormSchema
>;
export type TEmployeePaymentData = TEmployeePaymentFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;

  employee?: TEmployeeData;
  createdByEmployee?: TEmployeeData;
};

export type TPaginatedEmployeePaymentData =
  IPaginatedData<TEmployeePaymentData>;
