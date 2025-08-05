import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { TCategoryData, TCategoryFormSchema } from "schema";

export const getCategoriesBy = (by: "owner" | "shop", id: string) => {
  const url = `/categories/${by}/${id}`;
  return async (context: QueryFunctionContext<any>) => {
    const queryParams = context.meta;
    return axiosClient.get<TCategoryData[]>(url, { params: queryParams });
  };
};

export const createCategory = (brand: TCategoryFormSchema) => {
  const url = "/categories/create";

  return axiosClient.post<TCategoryData>(url, brand);
};
