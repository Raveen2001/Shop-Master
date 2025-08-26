import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosClient } from "../utils/axios";
import { TProductData, TProductFormSchema } from "schema";

export const getProductsBy = (by: "owner" | "shop", id: string) => {
  const url = `/products/${by}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = context.meta;

    return axiosClient.get<TProductData[]>(url, { params: queryParams });
  };
};

export const getProductById = (id: string) => {
  const url = `/products/${id}`;
  return async () => {
    return axiosClient.get<TProductData>(url, {
      params: { includeVariants: true },
    });
  };
};

export const createProduct = (product: TProductFormSchema) => {
  const url = "/products/create";
  return axiosClient.post<TProductData>(url, product);
};

export const updateProduct = (
  id: string,
  product: Partial<TProductFormSchema>
) => {
  const url = `/products/${id}`;
  return axiosClient.put<TProductData>(url, product);
};
