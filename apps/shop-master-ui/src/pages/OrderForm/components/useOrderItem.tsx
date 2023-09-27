import Fuse from "fuse.js";
import { KeyboardEvent, useCallback, useMemo, useState } from "react";
import { TOrderItemFormSchema, TProductVariantWithDetails } from "schema";
import { useGlobalStore } from "../../../store/globalStore";
import { useOrderContext } from "../OrderContext";

interface useOrderItemProps {
  idx: number;
  item: TOrderItemFormSchema;
}

const useOrderItem = ({ idx }: useOrderItemProps) => {
  const { addNewOrderItem, orderItems, watch, setFormFocus } =
    useOrderContext();

  const productVariants = useGlobalStore((state) =>
    state.getAllProductVariantsWithDetails()
  );

  const getProductVariantById = useCallback(
    (id: string) => {
      return productVariants.find((pv) => pv.id === id);
    },
    [productVariants]
  );

  const [selectedProductVariant, setSelectedProductVariant] =
    useState<TProductVariantWithDetails | null>(null);

  // watch for changes in the form and update the total
  // reference is not changing so we can't use useMemo
  const orderItem = watch(`items.${idx}`);
  const { quantity, unitPrice, discount } = orderItem;
  const total = Number(quantity) * Number(unitPrice) - Number(discount);

  // focus on the next field when enter is pressed
  const focusFieldOnEnter = (field: keyof TOrderItemFormSchema) => {
    return (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        setFormFocus(`items.${idx}.${field}`);
      }
    };
  };

  // add new item when enter is pressed
  const addNewOrderItemOnEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    // if it is not the last item don't add new item
    if (orderItems.length != idx + 1) return;

    if (e.key === "Enter") {
      addNewOrderItem();
    }
  };

  // search for product variant - fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(productVariants, {
        keys: ["product.name", "name", "brand.name"],
      }),
    [productVariants]
  );

  return {
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter: addNewOrderItemOnEnter,
    total,
    fuse,
    selectedProductVariant,
    setSelectedProductVariant,
    getProductVariantById,
  };
};

export default useOrderItem;
