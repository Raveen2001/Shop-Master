import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TShopData } from "schema";

interface IGlobalStore {
  shops?: Record<string, TShopData>;
  selectedShopId?: string;
  selectedShop?: TShopData;
  owner?: IOwnerData;

  setShops: (shops: TShopData[]) => void;
  setSelectedShopId: (shopId: string) => void;
  setOwner: (owner: IOwnerData) => void;
}

export const useGlobalStore = create(
  immer<IGlobalStore>((set) => ({
    shops: {},
    selectedShopId: "",
    owner: undefined,
    selectedShop: undefined,

    setShops: (shops: TShopData[]) => {
      set((state) => {
        state.shops = shops.reduce((acc, shop) => {
          acc[shop.id] = shop;
          return acc;
        }, {} as Record<string, TShopData>);
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
