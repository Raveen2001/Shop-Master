import { number, object } from "yup";
import { TProductVariantWithDetails } from "./product-variant";

export const OrderItemFormSchema = object({
  quantity: number()
    .min(1, "Quantity should be atleast 1")
    .required("Quantity is required"),

  discount: number().min(0, "Discount should be atleast 0"),
});

// export type TOrderItemFormSchema = InferType<typeof OrderItemFormSchema>;
// export type TOrderItemData = TOrderItemFormSchema & {
//   id: string;
//   orderId: number;
// };

// export type TOptionalOrderItemSchemaWithID = Partial<TOrderItemFormSchema> & {
//   cliendItemId: string;
// };

export type TTempOrderItemForm = {
  clientId: string;
  productVariant?: TProductVariantWithDetails | null;
  quantity?: number;
  discount?: number;
};

export type TOrderItemForm = {
  productVariantId: string;
  unitPrice: number;
  quantity: number;
  discount: number;
};
