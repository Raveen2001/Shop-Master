import { TCustomerPaymentData, TCustomerPaymentFormSchema } from "schema";
import { axiosClient } from "../utils/axios";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getCustomerPaymentsBy = (
  queryBy: "owner" | "employee" | "shop" | "createdByEmployee",
  id: string
) => {
  const url = `/customer-payments/${queryBy}/${id}`;
  return async (context: QueryFunctionContext) => {
    const queryParams = {
      ...context.meta,
      includeCustomer: true,
      includeCreatedByCustomer: true,
    };
    return axiosClient.get(url, { params: queryParams });
  };
};

export const createCustomerPayment = (data: TCustomerPaymentFormSchema) => {
  const url = `/customer-payments/create`;
  return axiosClient.post<TCustomerPaymentData>(url, data);
};
