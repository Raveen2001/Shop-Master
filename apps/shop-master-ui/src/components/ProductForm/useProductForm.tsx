import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TProductFormSchema, ProductFormSchema } from "schema";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/product";
import { uploadImage } from "../../services/upload";
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const isEditMode = !!props.product;
  const navigate = useNavigate();

  const selectedCategory = categories.find((c) => c.id === props.categoryId);

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

  const deleteMutation = useMutation<
    Awaited<ReturnType<typeof deleteProduct>>,
    IRequestError,
    string
  >({
    mutationKey: ["product", "delete"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "products"],
      });
      navigate("/products");
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
      name: props.product?.name || selectedCategory?.name || "",
      tamilName: props.product?.tamilName || selectedCategory?.tamilName || "",
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

  const onSubmit = handleSubmit(async (data) => {
    if (!data.description) data.description = null;
    if (!data.tamilName) data.tamilName = null;

    // Clear any previous upload errors
    setUploadError(null);

    console.log("Form submission started", { data, productImage });

    try {
      // Handle image upload if a new image is selected
      if (productImage) {
        console.log("Starting image upload...", productImage);
        setIsUploading(true);
        const uploadResult = await uploadImage(productImage);
        console.log("Image upload successful:", uploadResult);
        data.image = uploadResult.url;
        setIsUploading(false);
      } else {
        console.log("No image to upload");
      }

      console.log("Proceeding with product operation:", data);

      if (isEditMode) {
        updateMutation.mutate({
          id: props.product!.id,
          data,
        });
      } else {
        createMutation.mutate(data);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setIsUploading(false);
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload image"
      );
      // Don't proceed with product creation/update if image upload fails
      return;
    }
  });

  const handleDelete = () => {
    if (props?.product?.id) {
      deleteMutation.mutate(props.product.id);
    }
  };

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
    isMutateLoading: mutation.isPending || isUploading,
    mutateError: mutation.error,
    categories,
    shop: selectedShop,
    owner,
    setProductImage,
    handleClose,
    handleDelete,
    isDeleteLoading: deleteMutation.isPending,
    deleteError: deleteMutation.error,
    isUploading,
    uploadError,
  };
};

export default useProductForm;
