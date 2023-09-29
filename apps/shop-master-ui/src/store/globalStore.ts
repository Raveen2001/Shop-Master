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
  isOwnerDataFetched: boolean;
  isCategoryDataFetched: boolean;
  isBrandDataFetched: boolean;
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

  brands: TBrandData[];
  setBrands: (brands: TBrandData[]) => void;

  categories: TCategoryData[];
  setCategories: (categories: TCategoryData[]) => void;

  employees: TEmployeeData[];
  setEmployees: (employees: TEmployeeData[]) => void;

  products: TProductData[];
  setProducts: (products: TProductData[]) => void;

  isAllDataLoaded: () => boolean;
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
    brands: [],
    categories: [],
    products: [],
    isOwnerDataFetched: false,
    isCategoryDataFetched: false,
    isBrandDataFetched: false,
    isProductDataFetched: false,
    isShopsDataFetched: false,
    isEmployeeDataFetched: false,
    isCustomerDataFetched: false,

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
        state.isBrandDataFetched = false;
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
        state.isCategoryDataFetched = true;
      });
    },

    setBrands: (brands) => {
      set((state) => {
        state.brands = brands;
        state.isBrandDataFetched = true;
      });
    },

    isAllDataLoaded: () => {
      const state = get();
      return (
        state.isOwnerDataFetched &&
        state.isShopsDataFetched &&
        state.isCategoryDataFetched &&
        state.isBrandDataFetched &&
        state.isProductDataFetched
      );
    },

    getAllProductVariantsWithDetails() {
      const { products, brands, categories } = get();
      const mergedProduct = mergeProductData(products, brands, categories);
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
  }))
);
