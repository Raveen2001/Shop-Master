import { axiosClient } from "../utils/axios";
import { TCategoryData } from "schema";

export const getCategoriesByShopId = async (shopId: string) => {
  return axiosClient.get<TCategoryData[]>(`/categories/shop/${shopId}`);
};
