import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TCustomerFormSchema, CustomerFormSchema } from "schema";
import { createCustomer } from "../../services/customer";
import { useGlobalStore } from "../../store/globalStore";

const useCustomerForm = () => {
  const navigate = useNavigate();
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const {
    mutate,
    isLoading: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createCustomer>>,
    IRequestError,
    TCustomerFormSchema
  >({
    mutationKey: ["customer", "create"],
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      navigate("/customers");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TCustomerFormSchema>({
    defaultValues: {
      image: null,
      shopId: selectedShop?.id,
      ownerId: owner?.id,
      createdByEmployeeId: null,
    },
    resolver: yupResolver(CustomerFormSchema as any),
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.email) data.email = null;

    mutate(data);
  });

  return {
    register,
    onSubmit,
    formErrors,
    isMutateError,
    isMutateLoading,
    mutateError,
    mutate,
    setProfileImage,
    shop: selectedShop,
    owner,
  };
};

export default useCustomerForm;
