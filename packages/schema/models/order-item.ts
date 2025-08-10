import { InferType, number, object, string } from "yup";

export const OrderItemFormSchema = object({
  productVariantId: string().uuid().required("Product variant is required"),
  unitPrice: number().required("Unit price is required"),
  quantity: number()
    .min(1, "Quantity should be atleast 1")
    .required("Quantity is required"),

  totalPrice: number().required("Total price is required"),
  discount: number()
    .min(0, "Discount should be atleast 0")
    .required("Discount is required"),
});

export type TOrderItemFormSchema = InferType<typeof OrderItemFormSchema>;
