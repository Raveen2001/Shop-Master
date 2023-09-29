import { object, string, InferType, number, array } from "yup";
import { OrderItemFormSchema } from "./order-item";

const ORDER_TYPES = ["ONLINE", "OFFLINE"] as const;
const ORDER_STATUS = ["DRAFT", "COMPLETED"] as const;

export const OrderFormSchema = object({
  ownerId: string().required(),
  shopId: string().required(),
  customerPhone: string().required(),
  createdByEmployeeId: string().nullable(),

  type: string()
    .oneOf(ORDER_TYPES, "Type is invalid")
    .required("Type is required"),

  status: string()
    .oneOf(ORDER_STATUS, "Status is invalid")
    .required("Status is required"),

  tax: number().required(),
  delivery: number().required(),
  discount: number().required(),
  subTotal: number().required(),
  total: number().required(),
  items: array().of(OrderItemFormSchema).min(1).required(),
});

export type TOrderFormSchema = InferType<typeof OrderFormSchema>;
export type TOrderData = TOrderFormSchema & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export { ORDER_TYPES };
