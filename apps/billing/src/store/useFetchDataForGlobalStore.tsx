import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "./globalStore";
import {
  getCategoriesByShopId,
  getCustomersByShopId,
  getEmployeeData,
  getProductVariantsByShopId,
  getProductsByShopId,
  getShopById,
} from "../services";

const useFetchDataForGlobalStore = () => {
  const navigate = useNavigate();
  const {
    setShop,
    setCustomers,
    setCategories,
    setProducts,
    setEmployee,
    setProductVariants,
  } = useGlobalStore();

  const employeeQuery = useQuery({
    queryKey: ["employee"],
    queryFn: getEmployeeData,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!employeeQuery.isSuccess) return;

    setEmployee(employeeQuery.data);
  }, [employeeQuery.isSuccess, employeeQuery.data, setEmployee]);

  const shopQuery = useQuery({
    queryKey: ["shop", employeeQuery.data?.shopId],
    queryFn: () => getShopById(employeeQuery.data?.shopId ?? ""),
    enabled: !!employeeQuery.data?.shopId,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!shopQuery.isSuccess) return;
    setShop(shopQuery.data);

    if (!shopQuery.data) {
      navigate("/shops/create");
    }
  }, [navigate, shopQuery.isSuccess, shopQuery.data, setShop]);

  const customersQuery = useQuery({
    queryKey: ["shop", employeeQuery.data?.shopId, "customers"],
    queryFn: () => getCustomersByShopId(employeeQuery.data?.shopId ?? ""),
    enabled: !!employeeQuery.data?.shopId,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!customersQuery.isSuccess) return;
    setCustomers(customersQuery.data);
  }, [customersQuery.isSuccess, customersQuery.data, setCustomers]);

  const categoriesQuery = useQuery({
    queryKey: ["shop", employeeQuery.data?.shopId, "categories"],
    queryFn: () => getCategoriesByShopId(employeeQuery.data?.shopId ?? ""),
    enabled: !!employeeQuery.data?.shopId,
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
    queryKey: ["shop", employeeQuery.data?.shopId, "products"],
    queryFn: () => getProductsByShopId(employeeQuery.data?.shopId ?? ""),
    enabled: !!employeeQuery.data?.shopId,

    select: (data) => data.data,
  });

  useEffect(() => {
    if (!productsQuery.isSuccess) return;
    setProducts(productsQuery.data);
  }, [productsQuery.isSuccess, productsQuery.data, setProducts]);

  const productVariantsQuery = useQuery({
    queryKey: ["shop", employeeQuery.data?.shopId, "product-variants"],
    queryFn: () => getProductVariantsByShopId(employeeQuery.data?.shopId ?? ""),
    enabled: !!employeeQuery.data?.shopId,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!productVariantsQuery.isSuccess) return;
    setProductVariants(productVariantsQuery.data);
  }, [
    productVariantsQuery.isSuccess,
    productVariantsQuery.data,
    setProductVariants,
  ]);

  const isLoading = useMemo(
    () =>
      employeeQuery.isLoading ||
      shopQuery.isLoading ||
      productsQuery.isLoading ||
      categoriesQuery.isLoading ||
      productVariantsQuery.isLoading,
    [
      categoriesQuery.isLoading,
      employeeQuery.isLoading,
      productsQuery.isLoading,
      shopQuery.isLoading,
      productVariantsQuery.isLoading,
    ]
  );

  const isError = useMemo(
    () =>
      employeeQuery.isError ||
      shopQuery.isError ||
      productsQuery.isError ||
      categoriesQuery.isError ||
      productVariantsQuery.isError,
    [
      categoriesQuery.isError,
      employeeQuery.isError,
      productsQuery.isError,
      shopQuery.isError,
      productVariantsQuery.isError,
    ]
  );

  const isAllDataLoaded = useMemo(() => {
    return !isLoading && !isError;
  }, [isLoading, isError]);

  return {
    isAllDataLoaded,
    isLoading,
    isError,
  };
};

export default useFetchDataForGlobalStore;
