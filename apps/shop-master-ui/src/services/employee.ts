import { TEmployeeData, TEmployeeFormSchema } from "schema";
import { axiosClient } from "../utils/axios";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getEmployeeByShopId = (shopId: string) => {
  const url = `/employee/shop/${shopId}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get(url, { params: queryParams });
  };
};

export const createEmployee = (data: TEmployeeFormSchema) => {
  const url = `/employee/register`;
  return axiosClient.post<TEmployeeData>(url, data);
};
