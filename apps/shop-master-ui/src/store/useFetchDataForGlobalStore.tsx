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
  const {
    setOwner,
    setShops,
    setCustomers,
    setCategories,
    setProducts,
    selectedShopId,
    setSelectedShopId,
    getIsAllDataLoaded,
  } = useGlobalStore();

  const ownerQuery = useQuery({
    queryKey: ["owner"],
    queryFn: getOwnerByToken,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!ownerQuery.isSuccess) return;

    setOwner(ownerQuery.data);
  }, [ownerQuery.isSuccess, ownerQuery.data, setOwner]);

  const shopsQuery = useQuery({
    queryKey: ["shops", ownerQuery.data?.id],
    queryFn: getShopsByOwnerId(),
    enabled: !!ownerQuery.data,
    select: (data) => data.data.rows,
  });

  useEffect(() => {
    if (!shopsQuery.isSuccess) return;
    setShops(shopsQuery.data);

    if (!selectedShopId) {
      setSelectedShopId(shopsQuery.data[0]?.id);
    }

    if (shopsQuery.data.length === 0) {
      navigate("/shops/create");
    }
  }, [
    navigate,
    shopsQuery.isSuccess,
    shopsQuery.data,
    setShops,
    selectedShopId,
    setSelectedShopId,
  ]);

  const customersQuery = useQuery({
    queryKey: ["shop", selectedShopId, "customers"],
    queryFn: getCustomersBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!customersQuery.isSuccess) return;
    setCustomers(customersQuery.data);
  }, [customersQuery.isSuccess, customersQuery.data, setCustomers]);

  const categoriesQuery = useQuery({
    queryKey: ["shop", selectedShopId, "categories"],
    queryFn: getCategoriesBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
    select: (data) => data.data,
    meta: {
      includeSubCategories: true,
    },
  });

  useEffect(() => {
    if (!categoriesQuery.isSuccess) return;
    setCategories(categoriesQuery.data);
  }, [categoriesQuery.isSuccess, categoriesQuery.data, setCategories]);

  const productsQuery = useQuery({
    queryKey: ["shop", selectedShopId, "products"],
    queryFn: getProductsBy("shop", selectedShopId ?? ""),
    enabled: !!shopsQuery.data && !!selectedShopId,
    meta: {
      includeVariants: true,
    },
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!productsQuery.isSuccess) return;
    setProducts(productsQuery.data);
  }, [productsQuery.isSuccess, productsQuery.data, setProducts]);

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
    return !isLoading && !isError && !!getIsAllDataLoaded();
  }, [isLoading, isError, getIsAllDataLoaded]);

  return {
    isAllDataLoaded,
    hasNoShops,
    isLoading,
    isError,
  };
};

export default useFetchDataForGlobalStore;
