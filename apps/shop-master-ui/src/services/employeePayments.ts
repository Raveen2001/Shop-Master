import { TEmployeePaymentData, TEmployeePaymentFormSchema } from "schema";
import { axiosClient } from "../utils/axios";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getEmployeePaymentsBy = (
  queryBy: "owner" | "employee" | "shop" | "createdByEmployee",
  id: string
) => {
  const url = `/employee-payment/${queryBy}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = {
      ...context.meta,
      includeEmployee: true,
      includeCreatedByEmployee: true,
    };
    return axiosClient.get(url, { params: queryParams });
  };
};

export const createEmployeePayment = (data: TEmployeePaymentFormSchema) => {
  const url = `/employee-payment/new`;
  return axiosClient.post<TEmployeePaymentData>(url, data);
};
