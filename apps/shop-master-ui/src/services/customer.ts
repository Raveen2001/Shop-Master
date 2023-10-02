import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { TCustomerData, TCustomerFormSchema } from "schema";

export const getCustomersByShopId = (shopId: string) => {
  const url = `/customers/shop/${shopId}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<TCustomerData>(url, {
      params: queryParams,
    });
  };
};

export const createCustomer = (data: TCustomerFormSchema) => {
  const url = `/customers/create`;
  return axiosClient.post<TCustomerData>(url, data);
};
