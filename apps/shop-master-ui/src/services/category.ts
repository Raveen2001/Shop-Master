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

export const createCategory = (category: TCategoryFormSchema) => {
  const url = "/categories/create";
  return axiosClient.post<TCategoryData>(url, category);
};

export const updateCategory = (
  id: string,
  category: Partial<TCategoryFormSchema>
) => {
  const url = `/categories/${id}`;
  return axiosClient.put<TCategoryData>(url, category);
};

export const deleteCategory = (id: string) => {
  const url = `/categories/${id}`;
  return axiosClient.delete<{ message: string }>(url);
};
