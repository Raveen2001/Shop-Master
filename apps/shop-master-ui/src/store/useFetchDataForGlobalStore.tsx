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
  const {
    owner,
    selectedShop,
    selectedShopId,
    setSelectedShopId,
    setShops,
    setOwner,
  } = useGlobalStore();

  const ownerQuery = useQuery({
    queryKey: ["owner", "me"],
    queryFn: getOwnerByToken,
    onSuccess(data) {
      setOwner(data.data);
    },
  });

  const shopsQuery = useQuery({
    queryKey: ["shops"],
    queryFn: getShopsByOwnerId(ownerQuery.data?.data.id ?? ""),
    enabled: !!ownerQuery.data,

    onSuccess(data) {
      const shops = data.data.rows;
      if (shops.length) {
        setShops(shops);
        if (!selectedShopId) setSelectedShopId(data.data.rows[0]?.id);
      } else {
        navigate("/shops/create");
      }
    },
  });

  const brandsQuery = useQuery({
    queryKey: ["shop", selectedShopId, "brands"],
    queryFn: getBrandsBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
  });

  const categoriesQuery = useQuery({
    queryKey: ["shop", selectedShopId, "categories"],
    queryFn: getCategoriesBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
  });

  const subCategoriesQuery = useQuery({
    queryKey: ["shop", selectedShopId, "subCategories"],
    queryFn: getSubCategoriesBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
  });

  const productsQuery = useQuery({
    queryKey: ["shop", selectedShopId, "products"],
    queryFn: getProductsBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
    meta: {
      includeVariants: true,
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
    return !isLoading && !isError && !!owner && !!selectedShop;
  }, [isLoading, isError, owner, selectedShop]);

  if (isAllDataLoaded) {
    console.log("All data loaded");

    console.log("Owner", owner);
    console.log("Shops", shopsQuery.data?.data.rows);
    console.log("Selected Shop", selectedShop);
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
