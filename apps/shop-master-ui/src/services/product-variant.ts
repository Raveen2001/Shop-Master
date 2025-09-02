import { TProductVariantData, TProductVariantFormSchema } from "schema";
import { axiosClient } from "../utils/axios";

export const createProductVariant = (
  productVariant: TProductVariantFormSchema
) => {
  const url = "/product-variants/create";

  // productVariant.acquiredPrice = Number(productVariant.acquiredPrice);
  // productVariant.salePrice = Number(productVariant.salePrice);
  // productVariant.mrp = Number(productVariant.mrp);

  return axiosClient.post<TProductVariantData>(url, productVariant);
};

export const updateProductVariant = (
  id: string,
  productVariant: Partial<TProductVariantFormSchema>
) => {
  const url = `/product-variants/${id}`;
  return axiosClient.put<TProductVariantData>(url, productVariant);
};

export const deleteProductVariant = (id: string) => {
  const url = `/product-variants/${id}`;
  return axiosClient.delete<{ message: string }>(url);
};
