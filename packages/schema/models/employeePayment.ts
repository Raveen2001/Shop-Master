// import { EMPLOYEE_PAYEMENT_TYPES } from "database-drizzle";

import { object, string, mixed, InferType, number, date } from "yup";
import { TEmployeeData } from "./employee";
import { IPaginatedData } from "../common";

export const EmployeePaymentFormSchema = object({
  amount: number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
  comment: string(),
  createdAt: date().required(),
  //   type: mixed()
  //     .oneOf(EMPLOYEE_PAYEMENT_TYPES, "Type should be valid")
  //     .required("Payment type is required"),
  createdByEmployeeId: string().required(),
  employeeId: string().required(),
  shopId: string().required(),
  ownerId: string().required(),
});

export type TEmployeePaymentFormSchema = InferType<
  typeof EmployeePaymentFormSchema
>;
export type TEmployeePaymentData = TEmployeePaymentFormSchema & {
  id: string;
  createdAt: string;

  employee?: TEmployeeData;
  createdByEmployee?: TEmployeeData;
};

export type TPaginatedEmployeePaymentData =
  IPaginatedData<TEmployeePaymentData>;
