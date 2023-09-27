import { TOrderItemFormSchema } from "schema";

export const createNewEmptyOrderItem = (): TOrderItemFormSchema => ({
  productVariantId: "",

  quantity: 1,
  unitPrice: 0,
  discount: 0,
});
