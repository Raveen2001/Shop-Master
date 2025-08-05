import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TCategoryFormSchema, CategoryFormSchema } from "schema";
import { createCategory } from "../../services/category";
import { useGlobalStore } from "../../store/globalStore";

const useCategoryForm = () => {
  const navigate = useNavigate();
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);
  const queryClient = useQueryClient();
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const {
    mutate,
    isPending: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createCategory>>,
    IRequestError,
    TCategoryFormSchema
  >({
    mutationKey: ["category", "create"],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      navigate("/categories");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormState,
  } = useForm<TCategoryFormSchema>({
    defaultValues: {
      image: null,
      parentId: null,
    },
    resolver: yupResolver(CategoryFormSchema as any),
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");
  }, [owner?.id, setFormState, selectedShop?.id]);

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return {
    register,
    onSubmit,
    formErrors,
    isMutateError,
    isMutateLoading,
    mutateError,
    setCategoryImage,
    shop: selectedShop,
    owner,
  };
};

export default useCategoryForm;
