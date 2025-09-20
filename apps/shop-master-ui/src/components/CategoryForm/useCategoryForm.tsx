import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TCategoryFormSchema, CategoryFormSchema } from "schema";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category";
import { uploadImage } from "../../services/upload";
import { useGlobalStore } from "../../store/globalStore";
import { TCategoryFormProps } from "./CategoryForm";

const useCategoryForm = (props?: TCategoryFormProps) => {
  const navigate = useNavigate();
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);

  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const isEditMode = !!props?.category;

  const queryClient = useQueryClient();

  const createMutation = useMutation<
    Awaited<ReturnType<typeof createCategory>>,
    IRequestError,
    TCategoryFormSchema
  >({
    mutationKey: ["category", "create"],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
      props?.onSuccess?.();
    },
  });

  const updateMutation = useMutation<
    Awaited<ReturnType<typeof updateCategory>>,
    IRequestError,
    { id: string; data: Partial<TCategoryFormSchema> }
  >({
    mutationKey: ["category", "update"],
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
      props?.onSuccess?.();
    },
  });

  const deleteMutation = useMutation<
    Awaited<ReturnType<typeof deleteCategory>>,
    IRequestError,
    string
  >({
    mutationKey: ["category", "delete"],
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
    },
  });

  const mutation = isEditMode ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TCategoryFormSchema>({
    resolver: yupResolver(CategoryFormSchema as any),
    defaultValues: {
      name: props?.category?.name || "",
      tamilName: props?.category?.tamilName || "",
      parentId: props?.parentCategoryId || props?.category?.parentId || null,
      shopId: props?.category?.shopId || selectedShop?.id || "",
      ownerId: props?.category?.ownerId || owner?.id || "",
      image: props?.category?.image || null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!data.tamilName) data.tamilName = null;
    if (!data.parentId) data.parentId = null;

    // Clear any previous upload errors
    setUploadError(null);

    try {
      // Handle image upload if a new image is selected
      if (categoryImage) {
        console.log("Starting image upload...", categoryImage);
        setIsUploading(true);
        const uploadResult = await uploadImage(categoryImage);
        console.log("Image upload successful:", uploadResult);
        data.image = uploadResult.url;
        setIsUploading(false);
      } else {
        console.log("No image to upload");
      }

      if (isEditMode && props.category) {
        updateMutation.mutate({
          id: props.category.id,
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
      // Don't proceed with category creation/update if image upload fails
      return;
    }
  });

  const handleDelete = () => {
    if (props?.category?.id) {
      deleteMutation.mutate(props.category.id);
    }
  };

  const handleClose = () => {
    if (props?.onSuccess) {
      props.onSuccess();
    } else {
      navigate("/categories");
    }
  };

  return {
    register,
    onSubmit,
    formErrors,
    isMutateError: mutation.isError,
    isMutateLoading: mutation.isPending || isUploading,
    mutateError: mutation.error,
    shop: selectedShop,
    owner,
    setCategoryImage,
    handleClose,
    handleDelete,
    isDeleteLoading: deleteMutation.isPending,
    deleteError: deleteMutation.error,
    isUploading,
    uploadError,
  };
};

export default useCategoryForm;
