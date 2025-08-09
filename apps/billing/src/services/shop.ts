import { TShopData } from "schema";
import { axiosClient } from "../utils/axios";

export const getShopById = async (shopId: string) => {
  return axiosClient.get<TShopData>(`/shops/${shopId}`);
};
