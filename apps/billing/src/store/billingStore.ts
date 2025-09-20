import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  TCategoryData,
  TEmployeeData,
  TOrderFormSchema,
  TProductData,
  TProductVariantData,
} from "schema";
import { INITIAL_ORDER } from "../constants/order";
import { CustomItemFormData } from "../components/AddCustomItemModal/AddCustomItemModal";
import { roundToTwoDecimalPlaces } from "../utils/math";

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
  addToOrder: (variant: TProductVariantData, quantity?: number) => void;
  addCustomItemToOrder: (customItem: CustomItemFormData) => void;
  updateOrderItemQuantity: (variantId: string, newQuantity: number) => void;
  updateOrderItemName: (variantId: string, newName: string) => void;
  updateOrderItemUnitPrice: (variantId: string, newUnitPrice: number) => void;
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

    addToOrder: (variant, quantity = 1) => {
      set((state) => {
        const existingItemIndex = state.order.items.findIndex(
          (item) => item.productVariantId === variant.id
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          state.order.items[existingItemIndex].quantity += quantity;
          state.order.items[existingItemIndex].totalPrice =
            roundToTwoDecimalPlaces(
              state.order.items[existingItemIndex].quantity * variant.salePrice
            );
        } else {
          // Add new item
          state.order.items.push({
            productVariantId: variant.id,
            unitPrice: variant.salePrice,
            acquiredPrice: variant.acquiredPrice,
            mrp: variant.mrp,
            customProductName: null,

            quantity,
            totalPrice: roundToTwoDecimalPlaces(quantity * variant.salePrice),
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

    addCustomItemToOrder: (customItem) => {
      set((state) => {
        // Generate a unique ID for custom items
        const customItemId = `custom-${Date.now()}`;

        const totalPrice = roundToTwoDecimalPlaces(
          customItem.quantity * customItem.unitPrice
        );

        // Add custom item to order
        state.order.items.push({
          productVariantId: customItemId,
          unitPrice: customItem.unitPrice,
          quantity: customItem.quantity,
          totalPrice: totalPrice,
          discount: 0,
          acquiredPrice: customItem.acquiredPrice,
          mrp: customItem.mrp,
          customProductName: customItem.name,
        });

        // Update order total
        const orderTotal = state.order.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        state.order.total = orderTotal;
      });
    },

    updateOrderItemQuantity: (variantId, newQuantity) => {
      set((state) => {
        const item = state.order.items.find(
          (item) => item.productVariantId === variantId
        );
        if (item) {
          item.quantity = newQuantity;
          item.totalPrice = roundToTwoDecimalPlaces(
            newQuantity * item.unitPrice
          );

          const totalPrice = state.order.items.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );
          state.order.total = totalPrice;
        }
      });
    },

    updateOrderItemName: (variantId, newName) => {
      set((state) => {
        const item = state.order.items.find(
          (item) => item.productVariantId === variantId
        );
        if (item) {
          item.customProductName = newName;
        }
      });
    },

    updateOrderItemUnitPrice: (variantId, newUnitPrice) => {
      set((state) => {
        const item = state.order.items.find(
          (item) => item.productVariantId === variantId
        );
        if (item) {
          item.unitPrice = roundToTwoDecimalPlaces(newUnitPrice);
          item.totalPrice = roundToTwoDecimalPlaces(
            item.quantity * item.unitPrice
          );

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
      const order = structuredClone(get().order);

      order.subTotal = order.total;

      order.shopId = employee.shopId;
      order.ownerId = employee.ownerId;
      order.createdByEmployeeId = employee.id;
      order.createdAt = new Date();
      order.status = "COMPLETED";

      order.items.forEach((item) => {
        if (item.productVariantId?.startsWith("custom-")) {
          item.productVariantId = null;
        }
      });

      console.log(order);
      return order;
    },
  }))
);
