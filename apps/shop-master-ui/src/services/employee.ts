import { IPaginatedData, TEmployeeData, TEmployeeFormSchema } from "schema";
import { axiosClient } from "../utils/axios";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getEmployeeByShopId = (shopId: string) => {
  const url = `/employees/shop/${shopId}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<IPaginatedData<TEmployeeData>>(url, {
      params: queryParams,
    });
  };
};

export type TGetEmployeeByShopId = Awaited<
  ReturnType<ReturnType<typeof getEmployeeByShopId>>
>;

export const createEmployee = (data: TEmployeeFormSchema) => {
  const url = `/employees/register`;
  return axiosClient.post<TEmployeeData>(url, data);
};
