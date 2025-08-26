import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  IRequestError,
  TProductVariantFormSchema,
  ProductVariantFormSchema,
} from "schema";
import {
  createProductVariant,
  updateProductVariant,
} from "../../services/product-variant";
import { useGlobalStore } from "../../store/globalStore";
import { TProductVariantFormProps } from "./ProductVariantForm";

//TODO: add image upload
const useProductVariantForm = (props?: TProductVariantFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [owner, selectedShop, products, categories] = useGlobalStore(
    (state) => [
      state.owner,
      state.selectedShop,
      state.products,
      state.categories,
    ]
  );

  // Use productId from props if provided, otherwise use URL param
  const productId = props?.productId || id;

  const selectedProduct = products.find((product) => product.id === productId);

  // Only navigate if we're not in a modal context (no props provided)
  useEffect(() => {
    if (!selectedProduct && !props) {
      console.log("product not found", products, selectedProduct, id);
      navigate("/products");
    }
  }, [selectedProduct, props, products, id, navigate]);

  const selectedCategory = categories.find(
    (c) => c.id === selectedProduct?.categoryId
  );

  const queryClient = useQueryClient();
  const isEditMode = !!props?.variant;

  const createMutation = useMutation<
    Awaited<ReturnType<typeof createProductVariant>>,
    IRequestError,
    TProductVariantFormSchema
  >({
    mutationKey: ["product-variant", "create"],
    mutationFn: createProductVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "products"],
      });
      // Call onSuccess callback if provided, otherwise navigate
      if (props?.onSuccess) {
        props.onSuccess();
      } else {
        navigate("/products");
      }
    },
  });

  const updateMutation = useMutation<
    Awaited<ReturnType<typeof updateProductVariant>>,
    IRequestError,
    { id: string; data: Partial<TProductVariantFormSchema> }
  >({
    mutationKey: ["product-variant", "update"],
    mutationFn: ({ id, data }) => updateProductVariant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "products"],
      });
      // Call onSuccess callback if provided, otherwise navigate
      if (props?.onSuccess) {
        props.onSuccess();
      } else {
        navigate("/products");
      }
    },
  });

  const mutation = isEditMode ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
  } = useForm<TProductVariantFormSchema>({
    defaultValues: {
      availability: props?.variant?.availability ?? true,
      onlyForBilling: props?.variant?.onlyForBilling ?? false,
      mrp: props?.variant?.mrp ?? 1,
      salePrice: props?.variant?.salePrice ?? 1,
      acquiredPrice: props?.variant?.acquiredPrice ?? 1,
      name: props?.variant?.name ?? "",
      tamilName: props?.variant?.tamilName ?? "",
      unit: props?.variant?.unit ?? "KG",
      noOfUnits: props?.variant?.noOfUnits ?? 1,
      shopId: props?.variant?.shopId ?? selectedShop?.id ?? "",
      ownerId: props?.variant?.ownerId ?? owner?.id ?? "",
      productId: props?.variant?.productId ?? selectedProduct?.id ?? "",
    },
    resolver: yupResolver(ProductVariantFormSchema as any),
  });

  const onSubmit = handleSubmit((data) => {
    if (isEditMode && props?.variant) {
      updateMutation.mutate({ id: props.variant.id, data });
    } else {
      createMutation.mutate(data);
    }
  });

  return {
    register,
    control,
    onSubmit,
    formErrors,
    isMutateError: mutation.isError,
    isMutateLoading: mutation.isPending,
    mutateError: mutation.error,
    mutate: mutation.mutate,
    shop: selectedShop,
    owner,
    selectedProduct,
    selectedCategory,
  };
};

export default useProductVariantForm;
