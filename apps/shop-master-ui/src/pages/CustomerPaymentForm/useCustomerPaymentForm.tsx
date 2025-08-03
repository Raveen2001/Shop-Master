import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  CustomerPaymentFormSchema,
  IRequestError,
  TCustomerPaymentFormSchema,
} from "schema";
import { createCustomerPayment } from "../../services/customer-payments";

import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGlobalStore } from "../../store/globalStore";

const useCustomerPaymentForm = () => {
  const navigate = useNavigate();
  const [owner, selectedShop, customers] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
    state.customers,
  ]);
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isMutateLoading,
    isError: isMutateError,
    error: networkError,
  } = useMutation<
    Awaited<ReturnType<typeof createCustomerPayment>>,
    IRequestError,
    TCustomerPaymentFormSchema
  >({
    mutationKey: ["customer-payment", "create"],
    mutationFn: createCustomerPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "customers", "payments"],
      });
      navigate("/customers/payment-history");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormValue,
    getValues: getFormValue,
  } = useForm<TCustomerPaymentFormSchema>({
    resolver: yupResolver(CustomerPaymentFormSchema) as any,
    defaultValues: {
      createdAt: moment().toDate(),
      amount: 1,
    },
  });

  useEffect(() => {
    setFormValue("ownerId", owner?.id ?? "");
    setFormValue("shopId", selectedShop?.id ?? "");
    setFormValue("createdByCustomerId", null);
  }, [owner?.id, selectedShop?.id, setFormValue]);

  return {
    mutate,
    isMutateLoading,
    isError: isMutateError,
    networkError,

    register,
    handleSubmit,
    setFormValue,
    getFormValue,
    formErrors,
    owner,
    customers,
    selectedShop,
  };
};

export default useCustomerPaymentForm;
