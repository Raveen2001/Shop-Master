import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerByToken } from "../services/owner";
import { getShopsByOwnerId } from "../services/shop";
import { useGlobalStore } from "./globalStore";
import { getCategoriesBy } from "../services/category";
import { getProductsBy } from "../services/product";
import { getCustomersBy } from "../services/customer";

const useFetchDataForGlobalStore = () => {
  const navigate = useNavigate();
  const store = useGlobalStore();

  const ownerQuery = useQuery({
    queryKey: ["owner"],
    queryFn: getOwnerByToken,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!ownerQuery.isSuccess) return;

    store.setOwner(ownerQuery.data);
  }, [ownerQuery, store]);

  const shopsQuery = useQuery({
    queryKey: ["shops", ownerQuery.data?.id],
    queryFn: getShopsByOwnerId(),
    enabled: !!ownerQuery.data,
    select: (data) => data.data.rows,
  });

  useEffect(() => {
    if (!shopsQuery.isSuccess) return;
    store.setShops(shopsQuery.data);

    if (!store.selectedShopId) {
      store.setSelectedShopId(shopsQuery.data[0]?.id);
    }

    if (shopsQuery.data.length === 0) {
      navigate("/shops/create");
    }
  }, [navigate, shopsQuery, store]);

  const customersQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "customers"],
    queryFn: getCustomersBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!customersQuery.isSuccess) return;
    store.setCustomers(customersQuery.data);
  }, [customersQuery, store]);

  const categoriesQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "categories"],
    queryFn: getCategoriesBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
    select: (data) => data.data,
    meta: {
      includeSubCategories: true,
    },
  });

  useEffect(() => {
    if (!categoriesQuery.isSuccess) return;
    store.setCategories(categoriesQuery.data);
  }, [categoriesQuery, store]);

  const productsQuery = useQuery({
    queryKey: ["shop", store.selectedShopId, "products"],
    queryFn: getProductsBy("shop", store.selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!store.selectedShopId,
    meta: {
      includeVariants: true,
    },
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!productsQuery.isSuccess) return;
    store.setProducts(productsQuery.data);
  }, [productsQuery, store]);

  const isLoading = useMemo(
    () =>
      ownerQuery.isLoading ||
      shopsQuery.isLoading ||
      productsQuery.isLoading ||
      categoriesQuery.isLoading,
    [
      categoriesQuery.isLoading,
      ownerQuery.isLoading,
      productsQuery.isLoading,
      shopsQuery.isLoading,
    ]
  );

  const isError = useMemo(
    () =>
      ownerQuery.isError ||
      shopsQuery.isError ||
      productsQuery.isError ||
      categoriesQuery.isError,
    [
      categoriesQuery.isError,
      ownerQuery.isError,
      productsQuery.isError,
      shopsQuery.isError,
    ]
  );

  const hasNoShops = useMemo(() => {
    return shopsQuery.isSuccess && shopsQuery.data.length === 0;
  }, [shopsQuery.data, shopsQuery.isSuccess]);

  const isAllDataLoaded = useMemo(() => {
    return !isLoading && !isError && !!store.isAllDataLoaded();
  }, [isLoading, isError, store]);

  return {
    isAllDataLoaded,
    hasNoShops,
    isLoading,
    isError,
  };
};

export default useFetchDataForGlobalStore;
