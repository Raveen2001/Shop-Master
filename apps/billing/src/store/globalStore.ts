import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IEmployeeData {
  id: string;
  name: string;
  email: string;
  role: string;
  shopId: string;
}

interface IShopData {
  id: string;
  name: string;
  address?: string;
}

interface IProductData {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  shopId: string;
}

interface ICategoryData {
  id: string;
  name: string;
  shopId: string;
}

interface IGlobalStore {
  // Employee data
  employee?: IEmployeeData;
  setEmployee: (employee: IEmployeeData) => void;
  isEmployeeDataFetched: boolean;

  // Shop data
  shop?: IShopData;
  setShop: (shop: IShopData) => void;
  isShopDataFetched: boolean;

  // Products and categories for billing
  products: IProductData[];
  setProducts: (products: IProductData[]) => void;
  isProductDataFetched: boolean;

  categories: ICategoryData[];
  setCategories: (categories: ICategoryData[]) => void;
  isCategoryDataFetched: boolean;

  // Loading states
  isProductDataFetching: boolean;
  setIsProductDataFetching: (isFetching: boolean) => void;
  isCategoryDataFetching: boolean;
  setIsCategoryDataFetching: (isFetching: boolean) => void;

  // Utility methods
  getIsAllDataLoaded: () => boolean;
  getProductsByCategory: (categoryId: string) => IProductData[];
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set, get) => ({
    employee: undefined,
    shop: undefined,
    products: [],
    categories: [],

    isEmployeeDataFetched: false,
    isShopDataFetched: false,
    isProductDataFetched: false,
    isCategoryDataFetched: false,

    isProductDataFetching: false,
    isCategoryDataFetching: false,

    setEmployee: (employee: IEmployeeData) => {
      set((state) => {
        state.employee = employee;
        state.isEmployeeDataFetched = true;
      });
    },

    setShop: (shop: IShopData) => {
      set((state) => {
        state.shop = shop;
        state.isShopDataFetched = true;
      });
    },

    setProducts: (products: IProductData[]) => {
      set((state) => {
        state.products = products;
        state.isProductDataFetched = true;
        state.isProductDataFetching = false;
      });
    },

    setCategories: (categories: ICategoryData[]) => {
      set((state) => {
        state.categories = categories;
        state.isCategoryDataFetched = true;
        state.isCategoryDataFetching = false;
      });
    },

    setIsProductDataFetching: (isFetching: boolean) => {
      set((state) => {
        state.isProductDataFetching = isFetching;
      });
    },

    setIsCategoryDataFetching: (isFetching: boolean) => {
      set((state) => {
        state.isCategoryDataFetching = isFetching;
      });
    },

    getIsAllDataLoaded: () => {
      const state = get();
      return (
        state.isEmployeeDataFetched &&
        state.isShopDataFetched &&
        state.isProductDataFetched &&
        state.isCategoryDataFetched
      );
    },

    getProductsByCategory: (categoryId: string) => {
      const state = get();
      return state.products.filter(
        (product) => product.categoryId === categoryId
      );
    },
  }))
);
