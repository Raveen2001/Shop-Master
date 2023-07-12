import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";

export const getShopByOwnerId = (ownerId: string) => {
  const url = `/shop/owner/${ownerId}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get(url, { params: queryParams });
  };
};
