import { object, string, InferType, boolean, number } from "yup";

const ORDER_PAYMENT_TYPES = ["CASH", "UPI", "CARD"] as const;

export const OrderFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  customerPhone: string().required(),
  createdByEmployeeId: string().nullable(),

  paymentType: string()
    .oneOf(ORDER_PAYMENT_TYPES, "Payment type is invalid")
    .required("Payment type is required"),

  isDraft: boolean().required(),
  amountPaid: number().required(),
  totalAmount: number().required(),
  discount: number().required(),
  tax: number().required(),
  delivery: number().required(),
  subTotal: number().required(),
});

export type TOrderFormSchema = InferType<typeof OrderFormSchema>;
export type TOrderData = TOrderFormSchema & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export { ORDER_PAYMENT_TYPES };
