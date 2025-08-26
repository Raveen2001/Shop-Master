import { TOrderData, TOrderFormSchema } from "schema";
import { axiosClient } from "../utils/axios";

export const createOrder = async (order: TOrderFormSchema) => {
  return axiosClient.post<TOrderData>(`/orders`, order);
};
