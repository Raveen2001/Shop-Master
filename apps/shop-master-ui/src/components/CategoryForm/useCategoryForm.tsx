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
import { useGlobalStore } from "../../store/globalStore";
import { TCategoryFormProps } from "./CategoryForm";

const useCategoryForm = (props?: TCategoryFormProps) => {
  const navigate = useNavigate();
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);

  const [categoryImage, setCategoryImage] = useState<File | null>(null);
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
      navigate("/categories");
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
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.tamilName) data.tamilName = null;
    if (!data.parentId) data.parentId = null;

    if (isEditMode) {
      updateMutation.mutate({
        id: props.category!.id,
        data,
      });
    } else {
      createMutation.mutate(data);
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
    isMutateLoading: mutation.isPending,
    mutateError: mutation.error,
    shop: selectedShop,
    owner,
    setCategoryImage,
    handleClose,
    handleDelete,
    isDeleteLoading: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};

export default useCategoryForm;
