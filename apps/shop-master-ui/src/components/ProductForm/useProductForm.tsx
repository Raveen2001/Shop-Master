import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IRequestError, TProductFormSchema, ProductFormSchema } from "schema";
import { createProduct } from "../../services/product";
import { useGlobalStore } from "../../store/globalStore";
import { TProductFormProps } from "./ProductForm";

type TUseProductFormProps = TProductFormProps;

const useProductForm = (props: TUseProductFormProps) => {
  const [owner, selectedShop, categories] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
    state.categories,
  ]);
  const [productImage, setProductImage] = useState<File | null>(null);

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
      props.onSuccess?.();
    },
  });

  const {
    register,
    handleSubmit,

    formState: { errors: formErrors },
    getValues: getFormValues,
    setValue: setFormState,
  } = useForm<TProductFormSchema>({
    resolver: yupResolver(ProductFormSchema as any),
    defaultValues: {
      categoryId: props.categoryId,
    },
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");

    // Set categoryId from URL params if available
    if (props.categoryId) {
      console.log("props.categoryId", props.categoryId);
      setFormState("categoryId", props.categoryId);
    }
  }, [owner?.id, setFormState, selectedShop?.id, props.categoryId]);

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

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
    categories,

    productImage,
    setProductImage,
  };
};

export default useProductForm;
