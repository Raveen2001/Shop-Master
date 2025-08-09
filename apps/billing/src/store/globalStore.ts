import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TCategoryData,
  TCustomerData,
  TEmployeeData,
  TProductData,
  TProductVariantData,
  TShopData,
} from "schema";
import { mergeProductData } from "ui";

interface IGlobalStore {
  isCategoryDataFetching: boolean;
  setIsCategoryDataFetching: (isFetching: boolean) => void;
  isProductDataFetching: boolean;
  setIsProductDataFetching: (isFetching: boolean) => void;

  isProductVariantsDataFetching: boolean;
  setIsProductVariantsDataFetching: (isFetching: boolean) => void;

  isCategoryDataFetched: boolean;
  isProductDataFetched: boolean;
  isShopDataFetched: boolean;
  isEmployeeDataFetched: boolean;
  isCustomerDataFetched: boolean;

  shop?: TShopData;
  setShop: (shop: TShopData) => void;

  customers: TCustomerData[];
  setCustomers: (customers: TCustomerData[]) => void;

  categories: TCategoryData[];
  setCategories: (categories: TCategoryData[]) => void;

  employee?: TEmployeeData;
  setEmployee: (employee: TEmployeeData) => void;

  products: TProductData[];
  setProducts: (products: TProductData[]) => void;

  productVariants: TProductVariantData[];
  setProductVariants: (productVariants: TProductVariantData[]) => void;

  getIsAllDataLoaded: () => boolean;
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set, get) => ({
    employee: undefined,
    isEmployeeDataFetched: false,

    shop: undefined,
    customers: [],
    categories: [],
    products: [],
    productVariants: [],
    isCategoryDataFetched: false,
    isProductDataFetched: false,
    isShopDataFetched: false,
    isCustomerDataFetched: false,

    isCategoryDataFetching: false,
    isProductDataFetching: false,
    isProductVariantsDataFetching: false,

    setShop: (shop: TShopData) => {
      set((state) => {
        state.shop = shop;
        state.isShopDataFetched = true;
      });
    },

    setEmployee: (employee) => {
      set((state) => {
        state.employee = employee;
        state.isEmployeeDataFetched = true;
      });
    },

    setCustomers: (customers) => {
      set((state) => {
        state.customers = customers;
        state.isCustomerDataFetched = true;
      });
    },

    setProducts: (products) => {
      set((state) => {
        state.products = products;
        state.isProductDataFetched = true;
        state.isProductDataFetching = false;
      });
    },

    setCategories: (categories) => {
      set((state) => {
        state.categories = categories;
        state.isCategoryDataFetching = false;
        state.isCategoryDataFetched = true;
      });
    },

    setProductVariants: (productVariants) => {
      set((state) => {
        state.productVariants = productVariants;
      });
    },

    getIsAllDataLoaded: () => {
      const state = get();
      return (
        state.isEmployeeDataFetched &&
        state.isShopDataFetched &&
        state.isCustomerDataFetched &&
        state.isCategoryDataFetched &&
        state.isProductDataFetched
      );
    },

    getAllProductVariantsWithDetails() {
      const { products, categories } = get();
      const mergedProduct = mergeProductData(products, categories);
      const productVariants = mergedProduct
        .map((product) => {
          const currentVariants = product.variants?.map((v) => ({
            product,
            ...v,
          }));
          return currentVariants ?? [];
        })
        .flat();

      return productVariants;
    },

    setIsCategoryDataFetching: (isFetching: boolean) => {
      set((state) => {
        state.isCategoryDataFetching = isFetching;
      });
    },

    setIsProductDataFetching: (isFetching: boolean) => {
      set((state) => {
        state.isProductDataFetching = isFetching;
      });
    },

    setIsProductVariantsDataFetching: (isFetching: boolean) => {
      set((state) => {
        state.isProductVariantsDataFetching = isFetching;
      });
    },
  }))
);
