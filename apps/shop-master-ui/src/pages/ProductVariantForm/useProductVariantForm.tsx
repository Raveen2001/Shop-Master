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

//TODO: add image upload
const useProductVariantForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [owner, selectedShop, products, brands, categories] = useGlobalStore(
    (state) => [
      state.owner,
      state.selectedShop,
      state.products,
      state.brands,
      state.categories,
    ]
  );

  const selectedProduct = products.find((product) => product.id === id);
  // navigate to products if unable to find the product
  if (!selectedProduct) {
    console.log("product not found", products, selectedProduct, id);
    navigate("/products");
  }

  const selectedBrand = brands.find((b) => b.id === selectedProduct?.brandId);
  const selectedCategory = categories.find(
    (c) => c.id === selectedProduct?.categoryId
  );
  const selectedSubCategory = selectedCategory?.subCategories?.find(
    (sc) => sc.id === selectedProduct?.subCategoryId
  );

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutateLoading,
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
      queryClient.invalidateQueries(["shop", selectedShop?.id, "products"]);
      navigate("/products");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
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
    onSubmit,
    formErrors,
    isMutateError,
    isMutateLoading,
    mutateError,
    mutate,
    shop: selectedShop,
    owner,
    selectedProduct,
    selectedBrand,
    selectedCategory,
    selectedSubCategory,
  };
};

export default useProductVariantForm;
