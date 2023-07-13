import { IPaginatedData } from "./../../../../packages/ui/models/paginated";
import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { AxiosResponse } from "axios";
import { IShopData } from "../models/shop";

export const getShopsByOwnerId = (ownerId: string) => {
  const url = `/shop/owner/${ownerId}`;
  return async (
    context: QueryFunctionContext
  ): Promise<AxiosResponse<IPaginatedData<IShopData[]>>> => {
    const queryParams = context.meta;
    return axiosClient.get(url, { params: queryParams });
  };
};
