import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { TSubCategoryData } from "schema";

export const getSubCategoriesBy = (by: "owner" | "shop", id: string) => {
  const url = `/sub-categories/${by}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;
    return axiosClient.get<TSubCategoryData[]>(url, { params: queryParams });
  };
};
