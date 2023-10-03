import { IPaginatedData, TOrderData, TOrderFormSchema } from "schema";
import { axiosClient } from "../utils/axios";
import { QueryFunctionContext } from "@tanstack/react-query";

export const createOrder = (data: TOrderFormSchema) => {
  const url = `/orders/create`;
  return axiosClient.post<TOrderData>(url, data);
};

export const getPagedOrdersBy = (
  by: "shop" | "owner",
  id: string,
  options: Record<string, any>
) => {
  const url = `/orders/${by}/${id}/paged`;
  return async (context: QueryFunctionContext) => {
    const queryParams = { ...context.meta, ...options };

    return axiosClient.get<IPaginatedData<TOrderData>>(url, {
      params: queryParams,
    });
  };
};
