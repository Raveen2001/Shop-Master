import { IPaginatedData } from "schema/common/pagination";
import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { TShopData, TShopFormSchema } from "schema";

export const getShopsByOwnerId = () => {
  const url = `/shops`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<IPaginatedData<TShopData>>(url, {
      params: queryParams,
    });
  };
};

export const createShop = (data: TShopFormSchema) => {
  const url = `/shops/create`;
  return axiosClient.post<TShopData>(url, data);
};
