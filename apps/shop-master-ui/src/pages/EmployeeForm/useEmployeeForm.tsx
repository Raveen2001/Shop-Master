import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TEmployeeFormSchema, EmployeeFormSchema } from "schema";
import { createEmployee } from "../../services/employee";
import { useGlobalStore } from "../../store/globalStore";

const useEmployeeForm = () => {
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
    Awaited<ReturnType<typeof createEmployee>>,
    IRequestError,
    TEmployeeFormSchema
  >({
    mutationKey: ["employee", "create"],
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      navigate("/employees");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormState,
  } = useForm<TEmployeeFormSchema>({
    defaultValues: {
      image: null,
    },
    resolver: yupResolver(EmployeeFormSchema),
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");
  }, [owner?.id, setFormState, selectedShop?.id]);
  return {
    register,
    handleSubmit,
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

export default useEmployeeForm;
