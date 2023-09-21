import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TBrandData, TCategoryData, TProductData, TShopData } from "schema";
import { TOwnerData } from "../models/owner";

interface IGlobalStore {
  owner?: TOwnerData;
  setOwner: (owner: TOwnerData) => void;

  shops: TShopData[];
  setShops: (shops: TShopData[]) => void;

  selectedShopId: string;
  setSelectedShopId: (shopId: string) => void;

  selectedShop?: TShopData;

  brands: TBrandData[];
  setBrands: (brands: TBrandData[]) => void;

  categories: TCategoryData[];
  setCategories: (categories: TCategoryData[]) => void;

  products: TProductData[];
  setProducts: (products: TProductData[]) => void;
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set) => ({
    owner: undefined,
    shops: [],
    selectedShopId: "",
    selectedShop: undefined,
    brands: [],
    categories: [],
    products: [],

    setShops: (shops: TShopData[]) => {
      set((state) => {
        state.shops = shops;
      });
    },

    setSelectedShopId: (shopId: string) => {
      set((state) => {
        state.selectedShopId = shopId;
        state.selectedShop = state.shops.find((shop) => shop.id === shopId);
      });
    },

    setOwner: (owner: TOwnerData) => {
      set((state) => {
        state.owner = owner;
      });
    },

    setProducts: (products) => {
      set((state) => {
        state.products = products;
      });
    },

    setCategories: (categories) => {
      set((state) => {
        state.categories = categories;
      });
    },

    setBrands: (brands) => {
      set((state) => {
        state.brands = brands;
      });
    },
  }))
);
