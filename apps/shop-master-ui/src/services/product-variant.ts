import { TProductVariantData, TProductVariantFormSchema } from "schema";
import { axiosClient } from "../utils/axios";

export const createProductVariant = (brand: TProductVariantFormSchema) => {
  const url = "/product-variants/create";
  return axiosClient.post<TProductVariantData>(url, brand);
};
