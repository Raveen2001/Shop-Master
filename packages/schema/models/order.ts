import { ORDER_PAYMENT_TYPES } from "database-drizzle";
import { object, string, InferType } from "yup";

export const OrderFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  customerId: string().nullable(),
  createdByOrderId: string().nullable(),

  paymentType: string()
    .oneOf(ORDER_PAYMENT_TYPES, "Payment type is invalid")
    .required("Payment type is required"),
});

export type TOrderFormSchema = InferType<typeof OrderFormSchema>;
export type TOrderData = TOrderFormSchema & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export { ORDER_PAYMENT_TYPES };
