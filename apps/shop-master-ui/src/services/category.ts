import { QueryFunctionContext } from "@tanstack/react-query";
import { TShopData } from "./../../../../packages/schema/models/shop";
import { axiosClient } from "../utils/axios";

export const getCategoriesBy = (by: "owner" | "shop", id: string) => {
  const url = `/categories/${by}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<TShopData>(url, { params: queryParams });
  };
};
