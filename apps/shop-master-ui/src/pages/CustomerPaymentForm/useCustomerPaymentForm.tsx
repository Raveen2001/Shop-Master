import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  CustomerPaymentFormSchema,
  IRequestError,
  TCustomerData,
  TCustomerPaymentFormSchema,
} from "schema";
import { createCustomerPayment } from "../../services/customer-payments";

import { useGlobalStore } from "../../store/globalStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCustomersByShopId } from "../../services/customer";
import moment from "moment";

const useCustomerPaymentForm = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<TCustomerData[]>([]);
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);
  const queryClient = useQueryClient();

  const { data: customersResponse, isError: isFetchError } = useQuery({
    // TCustomerData
    queryKey: ["shop", selectedShop?.id, "customers"],
    queryFn: getCustomersByShopId(selectedShop?.id ?? ""),
    enabled: !!selectedShop?.id,
  });

  const {
    mutate,
    isLoading: isMutateLoading,
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
      queryClient.invalidateQueries([
        "shop",
        selectedShop?.id,
        "customers",
        "payments",
      ]);
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
      customerId: "",
      type: "",
      amount: 1,
    },
  });

  useEffect(() => {
    setFormValue("ownerId", owner?.id ?? "");
    setFormValue("shopId", selectedShop?.id ?? "");
    setFormValue("createdByCustomerId", null);
  }, [owner?.id, selectedShop?.id, setFormValue]);

  useEffect(() => {
    if (!customersResponse) return;

    setCustomers(customersResponse.data.rows);
  }, [customersResponse]);

  return {
    mutate,
    isMutateLoading,
    isError: isFetchError || isMutateError,
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
