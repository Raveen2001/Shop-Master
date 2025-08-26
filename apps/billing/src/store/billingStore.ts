import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TCategoryData,
  TEmployeeData,
  TOrderData,
  TOrderFormSchema,
  TProductData,
  TProductVariantData,
} from "schema";
import { INITIAL_ORDER } from "../constants/order";

type IBillingStore = {
  // Navigation state
  currentStep: "categories" | "categoryDetails" | "products" | "variants";

  // Selection state
  selectedCategory?: TCategoryData;
  selectedProduct?: TProductData;
  categoryPath: TCategoryData[]; // Track navigation path

  // Order state
  order: TOrderFormSchema;

  // Navigation actions
  setCurrentStep: (
    step: "categories" | "categoryDetails" | "products" | "variants"
  ) => void;
  selectCategory: (category: TCategoryData) => void;
  selectProduct: (product: TProductData) => void;
  goBack: () => void;
  goToHome: () => void;
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
  completeOrder: (employee: TEmployeeData) => TOrderFormSchema;
  clearOrder: () => void;

  // Utility
  getOrderItemCount: () => number;
};

export const useBillingStore = create(
  immer<IBillingStore>((set, get) => ({
    currentStep: "categories",
    selectedCategory: undefined,
    selectedProduct: undefined,
    categoryPath: [],

    order: INITIAL_ORDER,

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

    goToHome: () => {
      set((state) => {
        state.currentStep = "categories";
        state.categoryPath = [];
        state.selectedCategory = undefined;
        state.selectedProduct = undefined;
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
        const existingItemIndex = state.order.items.findIndex(
          (item) => item.productVariantId === variant.id
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          state.order.items[existingItemIndex].quantity += quantity;
          state.order.items[existingItemIndex].totalPrice =
            state.order.items[existingItemIndex].quantity * variant.salePrice;
        } else {
          // Add new item
          state.order.items.push({
            productVariantId: variant.id,
            unitPrice: variant.salePrice,
            quantity,
            totalPrice: quantity * variant.salePrice,
            discount: 0,
          });
        }

        const totalPrice = state.order.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        state.order.total = totalPrice;
      });
    },

    updateOrderItemQuantity: (variantId, newQuantity) => {
      set((state) => {
        const item = state.order.items.find(
          (item) => item.productVariantId === variantId
        );
        if (item) {
          item.quantity = newQuantity;
          item.totalPrice = newQuantity * item.unitPrice;

          const totalPrice = state.order.items.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );
          state.order.total = totalPrice;
        }
      });
    },

    removeOrderItem: (variantId) => {
      set((state) => {
        state.order.items = state.order.items.filter(
          (item) => item.productVariantId !== variantId
        );

        const totalPrice = state.order.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        state.order.total = totalPrice;
      });
    },

    clearOrder: () => {
      set((state) => {
        state.order = INITIAL_ORDER;
      });
    },

    getOrderItemCount: () => {
      const state = get();
      return state.order.items.length;
    },

    completeOrder: (employee) => {
      set((state) => {
        state.order.subTotal = state.order.total;

        state.order.shopId = employee.shopId;
        state.order.ownerId = employee.ownerId;
        state.order.createdByEmployeeId = employee.id;
        state.order.createdAt = new Date();
        state.order.status = "COMPLETED";
      });
      return get().order;
    },
  }))
);
