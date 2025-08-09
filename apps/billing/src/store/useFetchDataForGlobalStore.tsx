import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "./globalStore";

// Mock API functions - replace with actual API calls when available
const getEmployeeByToken = async () => {
  // This would typically call your actual API
  // For now, we'll simulate getting employee data from localStorage
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  // Mock employee data - replace with actual API call
  return {
    id: "emp-001",
    name: "John Doe",
    email: "john@shop.com",
    role: "cashier",
    shopId: "shop-001",
  };
};

const getShopById = async (shopId: string) => {
  // Mock shop data - replace with actual API call
  return {
    id: shopId,
    name: "Main Store",
    address: "123 Main St, City",
  };
};

const getProductsByShop = async (shopId: string) => {
  // Mock products data - replace with actual API call
  return [
    {
      id: "prod-001",
      name: "Product 1",
      price: 10.99,
      categoryId: "cat-001",
      shopId,
    },
    {
      id: "prod-002",
      name: "Product 2",
      price: 15.99,
      categoryId: "cat-001",
      shopId,
    },
    {
      id: "prod-003",
      name: "Product 3",
      price: 8.99,
      categoryId: "cat-002",
      shopId,
    },
  ];
};

const getCategoriesByShop = async (shopId: string) => {
  // Mock categories data - replace with actual API call
  return [
    {
      id: "cat-001",
      name: "Electronics",
      shopId,
    },
    {
      id: "cat-002",
      name: "Clothing",
      shopId,
    },
  ];
};

const useFetchDataForGlobalStore = () => {
  const navigate = useNavigate();
  const {
    setEmployee,
    setShop,
    setProducts,
    setCategories,
    setIsProductDataFetching,
    setIsCategoryDataFetching,
  } = useGlobalStore();

  // Fetch employee data
  const employeeQuery = useQuery({
    queryKey: ["employee"],
    queryFn: getEmployeeByToken,
    retry: false,
  });

  useEffect(() => {
    if (!employeeQuery.isSuccess) return;
    setEmployee(employeeQuery.data);
  }, [employeeQuery.isSuccess, employeeQuery.data, setEmployee]);

  // Fetch shop data when employee data is available
  const shopQuery = useQuery({
    queryKey: ["shop", employeeQuery.data?.shopId],
    queryFn: () => getShopById(employeeQuery.data!.shopId),
    enabled: !!employeeQuery.data?.shopId,
    retry: false,
  });

  useEffect(() => {
    if (!shopQuery.isSuccess) return;
    setShop(shopQuery.data);
  }, [shopQuery.isSuccess, shopQuery.data, setShop]);

  // Fetch products when shop data is available
  const productsQuery = useQuery({
    queryKey: ["shop", shopQuery.data?.id, "products"],
    queryFn: () => getProductsByShop(shopQuery.data!.id),
    enabled: !!shopQuery.data?.id,
    retry: false,
  });

  useEffect(() => {
    if (!productsQuery.isSuccess) return;
    setProducts(productsQuery.data);
  }, [productsQuery.isSuccess, productsQuery.data, setProducts]);

  // Fetch categories when shop data is available
  const categoriesQuery = useQuery({
    queryKey: ["shop", shopQuery.data?.id, "categories"],
    queryFn: () => getCategoriesByShop(shopQuery.data!.id),
    enabled: !!shopQuery.data?.id,
    retry: false,
  });

  useEffect(() => {
    if (!categoriesQuery.isSuccess) return;
    setCategories(categoriesQuery.data);
  }, [categoriesQuery.isSuccess, categoriesQuery.data, setCategories]);

  // Set loading states
  useEffect(() => {
    setIsProductDataFetching(productsQuery.isLoading);
  }, [productsQuery.isLoading, setIsProductDataFetching]);

  useEffect(() => {
    setIsCategoryDataFetching(categoriesQuery.isLoading);
  }, [categoriesQuery.isLoading, setIsCategoryDataFetching]);

  // Handle authentication errors
  useEffect(() => {
    if (employeeQuery.isError) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [employeeQuery.isError, navigate]);

  const isLoading = useMemo(
    () =>
      employeeQuery.isLoading ||
      shopQuery.isLoading ||
      productsQuery.isLoading ||
      categoriesQuery.isLoading,
    [
      employeeQuery.isLoading,
      shopQuery.isLoading,
      productsQuery.isLoading,
      categoriesQuery.isLoading,
    ]
  );

  const isError = useMemo(
    () =>
      employeeQuery.isError ||
      shopQuery.isError ||
      productsQuery.isError ||
      categoriesQuery.isError,
    [
      employeeQuery.isError,
      shopQuery.isError,
      productsQuery.isLoading,
      categoriesQuery.isError,
    ]
  );

  const isAllDataLoaded = useMemo(() => {
    return !isLoading && !isError;
  }, [isLoading, isError]);

  return {
    isAllDataLoaded,
    isLoading,
    isError,
    employee: employeeQuery.data,
    shop: shopQuery.data,
  };
};

export default useFetchDataForGlobalStore;
