import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  EmployeePaymentFormSchema,
  IRequestError,
  TEmployeeData,
  TEmployeePaymentFormSchema,
} from "schema";
import { createEmployeePayment } from "../../services/employee-payments";

import { useGlobalStore } from "../../store/globalStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getEmployeeByShopId } from "../../services/employee";
import moment from "moment";

const useEmployeePaymentForm = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<TEmployeeData[]>([]);
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);
  const queryClient = useQueryClient();

  const { data: employeesResponse, isError: isFetchError } = useQuery({
    // TEmployeeData
    queryKey: ["shop", selectedShop?.id, "employees"],
    queryFn: getEmployeeByShopId(selectedShop?.id ?? ""),
    enabled: !!selectedShop?.id,
  });

  const {
    mutate,
    isLoading: isMutateLoading,
    isError: isMutateError,
    error: networkError,
  } = useMutation<
    Awaited<ReturnType<typeof createEmployeePayment>>,
    IRequestError,
    TEmployeePaymentFormSchema
  >({
    mutationKey: ["shops", "create"],
    mutationFn: createEmployeePayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["shops"]);
      navigate("/shops");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormValue,
    getValues: getFormValue,
  } = useForm<TEmployeePaymentFormSchema>({
    resolver: yupResolver(EmployeePaymentFormSchema) as any,
    defaultValues: {
      createdAt: moment().toDate(),
      employeeId: "",
      type: "",
      amount: 1,
    },
  });

  useEffect(() => {
    setFormValue("ownerId", owner?.id ?? "");
    setFormValue("shopId", selectedShop?.id ?? "");
    setFormValue("createdByEmployeeId", null);
  }, [owner?.id, selectedShop?.id, setFormValue]);

  useEffect(() => {
    if (!employeesResponse) return;

    setEmployees(employeesResponse.data.rows);
  }, [employeesResponse]);

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
    employees,
    selectedShop,
  };
};

export default useEmployeePaymentForm;
