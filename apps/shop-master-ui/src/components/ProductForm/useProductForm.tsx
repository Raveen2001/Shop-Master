import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IRequestError, TProductFormSchema, ProductFormSchema } from "schema";
import { createProduct, updateProduct } from "../../services/product";
import { uploadImage } from "../../services/upload";
import { useGlobalStore } from "../../store/globalStore";
import { TProductFormProps } from "./ProductForm";
import { useNavigate } from "react-router-dom";

type TUseProductFormProps = TProductFormProps;

const useProductForm = (props: TUseProductFormProps) => {
  const [owner, selectedShop, categories] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
    state.categories,
  ]);
  const [productImage, setProductImage] = useState<File | null>(null);
  const isEditMode = !!props.product;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createMutation = useMutation<
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

  const updateMutation = useMutation<
    Awaited<ReturnType<typeof updateProduct>>,
    IRequestError,
    { id: string; data: Partial<TProductFormSchema> }
  >({
    mutationKey: ["product", "update"],
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "products"],
      });
      props.onSuccess?.();
    },
  });

  const mutation = isEditMode ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    getValues: getFormValues,
    setValue: setFormState,
  } = useForm<TProductFormSchema>({
    resolver: yupResolver(ProductFormSchema as any),
    defaultValues: {
      categoryId: props.categoryId || props.product?.categoryId,
      name: props.product?.name || "",
      tamilName: props.product?.tamilName || "",
      description: props.product?.description || "",
      image: props.product?.image || null,
      shopId: props.product?.shopId || selectedShop?.id || "",
      ownerId: props.product?.ownerId || owner?.id || "",
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
    if (!data.description) data.description = null;
    if (!data.tamilName) data.tamilName = null;

    if (isEditMode) {
      updateMutation.mutate({
        id: props.product!.id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }
  });

  const handleClose = () => {
    if (props.onSuccess) {
      props.onSuccess();
    } else {
      navigate("/products");
    }
  };

  return {
    register,
    onSubmit,
    formErrors,
    isMutateError: mutation.isError,
    isMutateLoading: mutation.isPending,
    mutateError: mutation.error,
    categories,
    shop: selectedShop,
    owner,
    setProductImage,
    handleClose,
  };
};

export default useProductForm;
