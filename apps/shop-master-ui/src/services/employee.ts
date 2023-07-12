import { IPaginatedData } from "ui";
import { axiosClient } from "../utils/axios";
import { IEmployeeData } from "../pages/ManageEmployee/models";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getEmployeeByShopId = (shopId: string) => {
  const url = `/employee/shop/${shopId}`;
  return async (
    context: QueryFunctionContext
  ): Promise<IPaginatedData<IEmployeeData>> => {
    const queryParams = context.meta;
    return axiosClient.get(url, { params: queryParams });
  };
};
