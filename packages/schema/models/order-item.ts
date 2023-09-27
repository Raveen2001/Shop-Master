import { InferType, number, object, string } from "yup";

export const OrderItemFormSchema = object({
  productVariantId: string()
    .default("")
    .required("Product variant is required"),
  unitPrice: number().min(1).required("Unit price is required"),
  quantity: number()
    .min(0, "Quantity should be atleast 1")
    .required("Quantity is required"),
  discount: number()
    .min(0, "Discount should be atleast 0")
    .required("Discount is required"),
});

// export type TOrderItemFormSchema = InferType<typeof OrderItemFormSchema>;
// export type TOrderItemData = TOrderItemFormSchema & {
//   id: string;
//   orderId: number;
// };

// export type TOptionalOrderItemSchemaWithID = Partial<TOrderItemFormSchema> & {
//   cliendItemId: string;
// };

export type TOrderItemFormSchema = InferType<typeof OrderItemFormSchema>;
