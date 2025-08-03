import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  IRequestError,
  TProductFormSchema,
  ProductFormSchema,
  TCategoryData,
} from "schema";
import { createProduct } from "../../services/product";
import { useGlobalStore } from "../../store/globalStore";

const useProductForm = () => {
  const navigate = useNavigate();
  const [owner, selectedShop, brands, categories] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
    state.brands,
    state.categories,
  ]);

  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createProduct>>,
    IRequestError,
    TProductFormSchema
  >({
    mutationKey: ["product", "create"],
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "products"],
      });
      navigate("/products");
    },
  });

  const {
    register,
    handleSubmit,

    watch: formWatch,
    formState: { errors: formErrors },
    getValues: getFormValues,
    setValue: setFormState,
  } = useForm<TProductFormSchema>({
    resolver: yupResolver(ProductFormSchema as any),
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");
  }, [owner?.id, setFormState, selectedShop?.id]);

  const onSubmit = handleSubmit((data) => {
    if (!data.brandId) data.brandId = null;
    if (!data.categoryId) data.categoryId = null;
    if (!data.subCategoryId) data.subCategoryId = null;

    mutate(data);
  });

  const selectedCategoryId = formWatch("categoryId");
  const subCategories = useMemo(() => {
    setFormState("subCategoryId", null);
    if (!selectedCategoryId) {
      return [];
    }
    const category = categories.find(
      (category) => category.id === selectedCategoryId
    ) as TCategoryData;

    return category.subCategories ?? [];
  }, [categories, selectedCategoryId, setFormState]);

  return {
    register,
    onSubmit,
    formErrors,
    getFormValues,
    isMutateError,
    isMutateLoading,
    mutateError,
    mutate,
    shop: selectedShop,
    owner,
    brands,
    categories,
    subCategories,
    selectedCategoryId,
  };
};

export default useProductForm;
