import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  IRequestError,
  TSubCategoryFormSchema,
  SubCategoryFormSchema,
} from "schema";
import { createSubCategory } from "../../services/sub-category";
import { useGlobalStore } from "../../store/globalStore";

const useSubCategoryForm = () => {
  const { id: categoryId } = useParams();

  const navigate = useNavigate();
  const [owner, selectedShop, categories] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
    state.categories,
  ]);

  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  if (!selectedCategory) {
    navigate("/categories");
  }

  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);

  const {
    mutate,
    isLoading: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createSubCategory>>,
    IRequestError,
    TSubCategoryFormSchema
  >({
    mutationKey: ["sub-category", "create"],
    mutationFn: createSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["shop", selectedShop?.id, "categories"]);
      navigate("/categories");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormState,
  } = useForm<TSubCategoryFormSchema>({
    defaultValues: {
      image: null,
    },
    resolver: yupResolver(SubCategoryFormSchema as any),
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");
    setFormState("categoryId", selectedCategory?.id ?? "");
  }, [owner?.id, setFormState, selectedShop?.id, selectedCategory?.id]);

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
    mutate,
    setProfileImage: setImage,
    shop: selectedShop,
    owner,
    category: selectedCategory,
  };
};

export default useSubCategoryForm;
