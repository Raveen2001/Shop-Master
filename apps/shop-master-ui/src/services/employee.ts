import { IPaginatedData, TEmployeeData, TEmployeeFormSchema } from "schema";
import { axiosClient } from "../utils/axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const getEmployeeByShopId = (shopId: string) => {
  const url = `/employees/shop/${shopId}`;
  return async (
    context: QueryFunctionContext
  ): Promise<AxiosResponse<IPaginatedData<TEmployeeData>>> => {
    const queryParams = context.meta;
    return axiosClient.get(url, { params: queryParams });
  };
};

export type TGetEmployeeByShopId = Awaited<
  ReturnType<ReturnType<typeof getEmployeeByShopId>>
>;

export const createEmployee = (data: TEmployeeFormSchema) => {
  const url = `/employees/register`;
  return axiosClient.post<TEmployeeData>(url, data);
};
