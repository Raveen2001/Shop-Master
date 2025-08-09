import { TProductVariantData } from "schema";
import { axiosClient } from "../utils/axios";

export const getProductVariantsByShopId = async (shopId: string) => {
  return axiosClient.get<TProductVariantData[]>(
    `/product-variants/shop/${shopId}`
  );
};
