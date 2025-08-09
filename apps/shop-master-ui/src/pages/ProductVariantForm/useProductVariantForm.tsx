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
import { createProductVariant } from "../../services/product-variant";
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

  const {
    mutate,
    isPending: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createProductVariant>>,
    IRequestError,
    TProductVariantFormSchema
  >({
    mutationKey: ["product", "create"],
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

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
  } = useForm<TProductVariantFormSchema>({
    defaultValues: {
      availability: true,
      onlyForBilling: false,
      mrp: 1,
      salePrice: 1,
      acquiredPrice: 1,
      shopId: selectedShop?.id ?? "",
      ownerId: owner?.id ?? "",
      productId: selectedProduct?.id ?? "",
    },
    resolver: yupResolver(ProductVariantFormSchema as any),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return {
    register,
    control,
    onSubmit,
    formErrors,
    isMutateError,
    isMutateLoading,
    mutateError,
    mutate,
    shop: selectedShop,
    owner,
    selectedProduct,
    selectedCategory,
  };
};

export default useProductVariantForm;
