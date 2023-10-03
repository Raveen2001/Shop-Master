import { TOrderData, TOrderFormSchema } from "schema";
import { axiosClient } from "../utils/axios";

export const createOrder = (data: TOrderFormSchema) => {
  const url = `/orders/create`;
  return axiosClient.post<TOrderData>(url, data);
};
