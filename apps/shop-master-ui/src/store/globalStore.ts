import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TBrandData,
  TCategoryData,
  TCustomerData,
  TEmployeeData,
  TProductData,
  TProductVariantWithDetails,
  TShopData,
} from "schema";
import { TOwnerData } from "../models/owner";
import { mergeProductData } from "../utils/product";

interface IGlobalStore {
  isCategoryDataFetching: boolean;
  setIsCategoryDataFetching: (isFetching: boolean) => void;

  isOwnerDataFetched: boolean;
  isCategoryDataFetched: boolean;
  isProductDataFetched: boolean;
  isShopsDataFetched: boolean;
  isEmployeeDataFetched: boolean;
  isCustomerDataFetched: boolean;

  owner?: TOwnerData;
  setOwner: (owner: TOwnerData) => void;

  shops: TShopData[];
  setShops: (shops: TShopData[]) => void;

  selectedShopId: string;
  setSelectedShopId: (shopId: string) => void;

  selectedShop?: TShopData;

  customers: TCustomerData[];
  setCustomers: (customers: TCustomerData[]) => void;

  categories: TCategoryData[];
  setCategories: (categories: TCategoryData[]) => void;

  employees: TEmployeeData[];
  setEmployees: (employees: TEmployeeData[]) => void;

  products: TProductData[];
  setProducts: (products: TProductData[]) => void;

  getIsAllDataLoaded: () => boolean;
  getAllProductVariantsWithDetails: () => TProductVariantWithDetails[];
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set, get) => ({
    owner: undefined,
    shops: [],
    selectedShopId: "",
    selectedShop: undefined,
    customers: [],
    employees: [],
    categories: [],
    products: [],
    isOwnerDataFetched: false,
    isCategoryDataFetched: false,
    isProductDataFetched: false,
    isShopsDataFetched: false,
    isEmployeeDataFetched: false,
    isCustomerDataFetched: false,

    isCategoryDataFetching: false,

    setShops: (shops: TShopData[]) => {
      set((state) => {
        state.shops = shops;
        state.isShopsDataFetched = true;
      });
    },

    setSelectedShopId: (shopId: string) => {
      set((state) => {
        if (state.selectedShopId === shopId) return;
        state.selectedShopId = shopId;
        state.selectedShop = state.shops.find((shop) => shop.id === shopId);
        state.isCategoryDataFetched = false;
        state.isProductDataFetched = false;
      });
    },

    setOwner: (owner: TOwnerData) => {
      set((state) => {
        state.owner = owner;
        state.isOwnerDataFetched = true;
      });
    },

    setEmployees: (employees) => {
      set((state) => {
        state.employees = employees;
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
      });
    },

    setCategories: (categories) => {
      set((state) => {
        state.categories = categories;
        state.isCategoryDataFetching = false;
        state.isCategoryDataFetched = true;
      });
    },

    getIsAllDataLoaded: () => {
      const state = get();
      return (
        state.isOwnerDataFetched &&
        state.isShopsDataFetched &&
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
      console.log("isFetching", isFetching);
      set((state) => {
        state.isCategoryDataFetching = true;
      });
    },
  }))
);
