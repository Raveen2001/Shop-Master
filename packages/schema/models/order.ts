import { object, string, InferType } from "yup";

const ORDER_PAYMENT_TYPES = ["CASH", "UPI", "CARD"] as const;

export const OrderFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  customerId: string().nullable(),
  createdByEmployeeId: string().nullable(),

  paymentType: string()
    .oneOf(ORDER_PAYMENT_TYPES, "Payment type is invalid")
    .required("Payment type is required"),
});

export type TOrderFormSchema = InferType<typeof OrderFormSchema>;
export type TOrderData = TOrderFormSchema & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export { ORDER_PAYMENT_TYPES };
