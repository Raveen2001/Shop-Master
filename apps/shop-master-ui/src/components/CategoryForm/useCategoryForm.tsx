import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IRequestError, TCategoryFormSchema, CategoryFormSchema } from "schema";
import { createCategory, updateCategory } from "../../services/category";
import { uploadImage } from "../../services/upload";
import { useGlobalStore } from "../../store/globalStore";
import { TCategoryFormProps } from "./CategoryForm";

type TUseCategoryFormProps = TCategoryFormProps;

const useCategoryForm = (props: TUseCategoryFormProps) => {
  const [owner, selectedShop, setIsCategoryDataFetching] = useGlobalStore(
    (state) => [
      state.owner,
      state.selectedShop,
      state.setIsCategoryDataFetching,
    ]
  );
  const queryClient = useQueryClient();
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const isEditMode = !!props.category;

  const createMutation = useMutation<
    Awaited<ReturnType<typeof createCategory>>,
    IRequestError,
    TCategoryFormSchema
  >({
    mutationKey: ["category", "create"],
    mutationFn: createCategory,
    onSuccess: () => {
      setIsCategoryDataFetching(true);
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
      props.onSuccess?.();
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
      setIsCategoryDataFetching(true);
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
      props.onSuccess?.();
    },
  });

  const mutation = isEditMode ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormState,
  } = useForm<TCategoryFormSchema>({
    defaultValues: {
      image: props.category?.image ?? null,
      parentId: props.parentCategoryId ?? props.category?.parentId ?? null,
      name: props.category?.name ?? "",
      tamilName: props.category?.tamilName ?? "",
      shopId: props.category?.shopId ?? selectedShop?.id ?? "",
      ownerId: props.category?.ownerId ?? owner?.id ?? "",
    },
    resolver: yupResolver(CategoryFormSchema as any),
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");
  }, [owner?.id, setFormState, selectedShop?.id]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    try {
      let imageUrl = props.category?.image;

      // Upload image if selected
      if (categoryImage) {
        const uploadResponse = await uploadImage(categoryImage);
        imageUrl = uploadResponse.url;
      }

      // Create/Update category with image URL
      const categoryData = {
        ...data,
        image: imageUrl,
      };

      if (isEditMode && props.category) {
        console.log("categoryData", categoryData);
        updateMutation.mutate({ id: props.category.id, data: categoryData });
      } else {
        createMutation.mutate(categoryData);
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      // Show error to user but don't proceed with category creation
      // You might want to show a toast notification here
      alert(`Upload failed: ${error.message}`);
    }
  });

  return {
    register,
    onSubmit,
    formErrors,
    isMutateError: mutation.isError,
    isMutateLoading: mutation.isPending,
    mutateError: mutation.error,
    setCategoryImage,
    shop: selectedShop,
    owner,
  };
};

export default useCategoryForm;
