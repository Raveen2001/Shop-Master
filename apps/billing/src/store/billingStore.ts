import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TCategoryData, TProductData, TProductVariantData } from "schema";

export type TOrderItem = {
  variant: TProductVariantData;
  productName: string;
  quantity: number;

  totalQuantityWithUnit: string;
  totalPrice: number;
};

type IBillingStore = {
  // Navigation state
  currentStep: "categories" | "categoryDetails" | "products" | "variants";

  // Selection state
  selectedCategory?: TCategoryData;
  selectedProduct?: TProductData;
  categoryPath: TCategoryData[]; // Track navigation path

  // Order state
  orderItems: TOrderItem[];

  // Navigation actions
  setCurrentStep: (
    step: "categories" | "categoryDetails" | "products" | "variants"
  ) => void;
  selectCategory: (category: TCategoryData) => void;
  selectProduct: (product: TProductData) => void;
  goBack: () => void;
  navigateToCategory: (category: TCategoryData) => void;
  navigateToCategoryInPath: (categoryIndex: number) => void;

  // Order actions
  addToOrder: (
    variant: TProductVariantData,
    productName: string,
    quantity?: number
  ) => void;
  updateOrderItemQuantity: (variantId: string, newQuantity: number) => void;
  removeOrderItem: (variantId: string) => void;
  clearOrder: () => void;

  // Utility
  getTotalAmount: () => number;
  getOrderItemCount: () => number;
};

export const useBillingStore = create(
  immer<IBillingStore>((set, get) => ({
    currentStep: "categories",
    selectedCategory: undefined,
    selectedProduct: undefined,
    categoryPath: [],
    orderItems: [],

    setCurrentStep: (step) => {
      set((state) => {
        state.currentStep = step;
      });
    },

    selectCategory: (category) => {
      set((state) => {
        state.selectedCategory = category;
        state.currentStep = "categoryDetails";
        // Add to navigation path
        state.categoryPath.push(category);
      });
    },

    navigateToCategory: (category) => {
      set((state) => {
        state.selectedCategory = category;
        state.currentStep = "categoryDetails";
        // Add to navigation path
        state.categoryPath.push(category);
      });
    },

    navigateToCategoryInPath: (categoryIndex) => {
      set((state) => {
        if (categoryIndex >= 0 && categoryIndex < state.categoryPath.length) {
          // Remove categories after the target index
          state.categoryPath = state.categoryPath.slice(0, categoryIndex + 1);
          state.selectedCategory = state.categoryPath[categoryIndex];
          state.currentStep = "categoryDetails";
        }

        if (categoryIndex === -1) {
          state.categoryPath = [];
          state.selectedCategory = undefined;
          state.selectedProduct = undefined;
          state.currentStep = "categories";
        }
      });
    },

    selectProduct: (product) => {
      set((state) => {
        state.selectedProduct = product;
        state.currentStep = "variants";
      });
    },

    goBack: () => {
      const state = get();
      if (state.currentStep === "variants") {
        set((state) => {
          state.currentStep = "categoryDetails";
          state.selectedProduct = undefined;
        });
      } else if (state.currentStep === "categoryDetails") {
        // Remove current category from path and go back
        set((state) => {
          state.categoryPath.pop();
          if (state.categoryPath.length === 0) {
            state.currentStep = "categories";
            state.selectedCategory = undefined;
          } else {
            state.selectedCategory =
              state.categoryPath[state.categoryPath.length - 1];
            state.currentStep = "categoryDetails";
          }
        });
      } else if (state.currentStep === "products") {
        set((state) => {
          state.currentStep = "categories";
          state.selectedCategory = undefined;
        });
      }
    },

    addToOrder: (variant, productName, quantity = 1) => {
      set((state) => {
        const existingItemIndex = state.orderItems.findIndex(
          (item) => item.variant.id === variant.id
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          state.orderItems[existingItemIndex].quantity += quantity;
          state.orderItems[existingItemIndex].totalPrice =
            state.orderItems[existingItemIndex].quantity * variant.salePrice;
        } else {
          // Add new item
          state.orderItems.push({
            variant,
            productName,
            quantity,
            totalQuantityWithUnit: `${quantity * variant.noOfUnits} ${
              variant.unit
            }`,
            totalPrice: quantity * variant.salePrice,
          });
        }
      });
    },

    updateOrderItemQuantity: (variantId, newQuantity) => {
      set((state) => {
        const item = state.orderItems.find(
          (item) => item.variant.id === variantId
        );
        if (item) {
          item.quantity = newQuantity;
          item.totalQuantityWithUnit = `${
            newQuantity * item.variant.noOfUnits
          } ${item.variant.unit}`;
          item.totalPrice = newQuantity * item.variant.salePrice;
        }
      });
    },

    removeOrderItem: (variantId) => {
      set((state) => {
        state.orderItems = state.orderItems.filter(
          (item) => item.variant.id !== variantId
        );
      });
    },

    clearOrder: () => {
      set((state) => {
        state.orderItems = [];
      });
    },

    getTotalAmount: () => {
      const state = get();
      return state.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    },

    getOrderItemCount: () => {
      const state = get();
      return state.orderItems.length;
    },
  }))
);
