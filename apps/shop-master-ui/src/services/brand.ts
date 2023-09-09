import { QueryFunctionContext } from "@tanstack/react-query";
import { TShopData } from "./../../../../packages/schema/models/shop";
import { axiosClient } from "../utils/axios";

export const getBrandsBy = (by: "owner" | "shop", id: string) => {
  const url = `/brands/${by}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<TShopData>(url, { params: queryParams });
  };
};
