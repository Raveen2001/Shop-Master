import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { TProductData } from "schema";

export const getProductsBy = (by: "owner" | "shop", id: string) => {
  const url = `/products/${by}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<TProductData[]>(url, { params: queryParams });
  };
};
