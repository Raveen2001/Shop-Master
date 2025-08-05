import { TEmployeeData } from "./employee.js";
import { object, string, InferType, number, date } from "yup";
import { TCustomerData } from "./customer.js";
import { IPaginatedData } from "../common/index.js";

export const CUSTOMER_PAYEMENT_TYPES = ["BALANCE"] as const;

export const CustomerPaymentFormSchema = object({
  amount: number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
  comment: string(),
  createdAt: date().required("Created at is required"),
  type: string()
    .oneOf(CUSTOMER_PAYEMENT_TYPES, "Payment Type should be valid")
    .required("Payment Type is required"),
  createdByCustomerId: string().nullable(),
  customerPhone: string().required("Phone is required"),
  shopId: string().required(),
  ownerId: string().required(),
});

export type TCustomerPaymentFormSchema = InferType<
  typeof CustomerPaymentFormSchema
>;
export type TCustomerPaymentData = TCustomerPaymentFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;

  customer?: TCustomerData;
  createdByEmployee?: TEmployeeData;
};

export type TPaginatedCustomerPaymentData =
  IPaginatedData<TCustomerPaymentData>;
