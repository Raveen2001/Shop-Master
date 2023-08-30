import { IPaginatedData } from "schema/common/pagination";
import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { AxiosResponse } from "axios";
import { TShopData, TShopFormSchema } from "schema";

export const getShopsByOwnerId = (ownerId: string) => {
  const url = `/shops/owner/${ownerId}`;
  return async (
    context: QueryFunctionContext
  ): Promise<AxiosResponse<IPaginatedData<TShopData>>> => {
    const queryParams = context.meta;
    return axiosClient.get(url, { params: queryParams });
  };
};

export const createShop = (data: TShopFormSchema) => {
  const url = `/shops/create`;
  return axiosClient.post<TShopData>(url, data);
};
