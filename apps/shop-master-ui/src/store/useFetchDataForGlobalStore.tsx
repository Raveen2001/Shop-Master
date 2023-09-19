import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerByToken } from "../services/owner";
import { getShopsByOwnerId } from "../services/shop";
import { useGlobalStore } from "./globalStore";
import { getBrandsBy } from "../services/brand";
import { getCategoriesBy } from "../services/category";
import { getSubCategoriesBy } from "../services/sub-category";
import { getProductsBy } from "../services/products";

const useFetchDataForGlobalStore = () => {
  const navigate = useNavigate();
  const store = useGlobalStore();

  const ownerQuery = useQuery({
    queryKey: ["owner", "me"],
    queryFn: getOwnerByToken,
    onSuccess(data) {
      store.setOwner(data.data);
    },
  });

  const shopsQuery = useQuery({
    queryKey: ["shops"],
    queryFn: getShopsByOwnerId(ownerQuery.data?.data.id ?? ""),
    enabled: !!ownerQuery.data,

    onSuccess(data) {
      const shops = data.data.rows;
      if (shops.length) {
        store.setShops(shops);
        if (!store.selectedShopId)
          store.setSelectedShopId(data.data.rows[0]?.id);
      } else {
        navigate("/shops/create");
      }
    },
  });

  const brandsQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "brands"],
    queryFn: getBrandsBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
    onSuccess(data) {
      store.setBrands(data.data);
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "categories"],
    queryFn: getCategoriesBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
    onSuccess(data) {
      store.setCategories(data.data);
    },
  });

  const subCategoriesQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "subCategories"],
    queryFn: getSubCategoriesBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
  });

  const productsQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "products"],
    queryFn: getProductsBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
    meta: {
      includeVariants: true,
    },

    onSuccess(data) {
      store.setProducts(data.data);
    },
  });

  const isLoading = useMemo(
    () =>
      ownerQuery.isLoading ||
      shopsQuery.isLoading ||
      productsQuery.isLoading ||
      brandsQuery.isLoading ||
      categoriesQuery.isLoading ||
      subCategoriesQuery.isLoading,
    [
      brandsQuery.isLoading,
      categoriesQuery.isLoading,
      ownerQuery.isLoading,
      productsQuery.isLoading,
      shopsQuery.isLoading,
      subCategoriesQuery.isLoading,
    ]
  );

  const isError = useMemo(
    () =>
      ownerQuery.isError ||
      shopsQuery.isError ||
      productsQuery.isError ||
      brandsQuery.isError ||
      categoriesQuery.isError ||
      subCategoriesQuery.isError,
    [
      brandsQuery.isError,
      categoriesQuery.isError,
      ownerQuery.isError,
      productsQuery.isError,
      shopsQuery.isError,
      subCategoriesQuery.isError,
    ]
  );

  const hasNoShops = useMemo(() => {
    return (
      !shopsQuery.isError &&
      !shopsQuery.isLoading &&
      !shopsQuery.data.data.rows.length
    );
  }, [
    shopsQuery.isError,
    shopsQuery.isLoading,
    shopsQuery.data?.data.rows.length,
  ]);

  const isAllDataLoaded = useMemo(() => {
    return !isLoading && !isError && !!store.owner && !!store.selectedShop;
  }, [isLoading, isError, store.owner, store.selectedShop]);

  if (isAllDataLoaded) {
    console.log("All data loaded");

    console.log("Owner", store.owner);
    console.log("Shops", shopsQuery.data?.data.rows);
    console.log("Selected Shop", store.selectedShop);
    console.log("Brands", brandsQuery.data?.data);
    console.log("Categories", categoriesQuery.data?.data);
    console.log("Sub Categories", subCategoriesQuery.data?.data);
    console.log("Products", productsQuery.data?.data);
  }

  return {
    isAllDataLoaded,
    hasNoShops,
    isLoading,
    isError,
  };
};

export default useFetchDataForGlobalStore;
