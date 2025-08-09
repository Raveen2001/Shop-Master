import { TProductData } from "schema";
import { axiosClient } from "../utils/axios";

export const getProductsByShopId = async (shopId: string) => {
  return axiosClient.get<TProductData[]>(`/products/shop/${shopId}`);
};
