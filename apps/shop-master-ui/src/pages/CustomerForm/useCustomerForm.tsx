import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomerFormSchema, IRequestError, TCustomerFormSchema } from "schema";
import { createCustomer } from "../../services/customer";
import { useGlobalStore } from "../../store/globalStore";
import { TCustomerFormProps } from "./CustomerForm";

const useCustomerForm = (props: TCustomerFormProps) => {
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(["customers"]);
      if (props.onCustomerAdded) {
        props.onCustomerAdded(data.data);
      } else {
        navigate("/customers");
      }
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TCustomerFormSchema>({
    defaultValues: {
      // default values to make field controlled
      type: "INDIVIDUAL",

      ...(props.initalData || {}),
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
    control,
  };
};

export default useCustomerForm;
