import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IShopData } from "../models/shop";

interface IGlobalStore {
  shops?: Record<string, IShopData>;
  selectedShopId?: string;
  selectedShop?: IShopData;
  owner?: IOwnerData;

  setShops: (shops: IShopData[]) => void;
  setSelectedShopId: (shopId: string) => void;
  setOwner: (owner: IOwnerData) => void;
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set) => ({
    shops: undefined,
    selectedShopId: undefined,
    owner: undefined,
    selectedShop: undefined,

    setShops: (shops: IShopData[]) => {
      set((state) => {
        state.shops = shops.reduce((acc, shop) => {
          acc[shop.id] = shop;
          return acc;
        }, {} as Record<string, IShopData>);
      });
    },

    setSelectedShopId: (shopId: string) => {
      set((state) => {
        state.selectedShopId = shopId;
        state.selectedShop = state.shops?.[shopId];
      });
    },

    setOwner: (owner: IOwnerData) => {
      set((state) => {
        state.owner = owner;
      });
    },
  }))
);
