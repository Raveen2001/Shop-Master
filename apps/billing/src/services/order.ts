import { TOrderFormSchema } from "schema";
import { axiosClient } from "../utils/axios";

export const createOrder = async (shopId: string, order: TOrderFormSchema) => {
  return axiosClient.post(`shop/${shopId}/orders`, order);
};
