import { object, string, InferType, number } from "yup";

export const OrderItemFormSchema = object({
  productVariantId: string().required("Product variant is required"),
  quantity: number()
    .min(1, "Quantity should be atleast 1")
    .required("Quantity is required"),
  unitPrice: number()
    .min(1, "Prize should be atleast 1")
    .required("Unit price is required"),
});

export type TOrderItemFormSchema = InferType<typeof OrderItemFormSchema>;
export type TOrderItemData = TOrderItemFormSchema & {
  id: string;
  orderId: number;
};
