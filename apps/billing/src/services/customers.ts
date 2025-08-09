import { TCustomerData } from "schema";
import { axiosClient } from "../utils/axios";

export const getCustomersByShopId = async (shopId: string) => {
  return axiosClient.get<TCustomerData[]>(`/customers/shop/${shopId}`);
};
