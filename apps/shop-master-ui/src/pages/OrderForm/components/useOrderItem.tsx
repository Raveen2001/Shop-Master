import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  OrderItemFormSchema,
  TOrderItemFormSchema,
  TProductVariantWithDetails,
} from "schema";
import { useOrderContext } from "../OrderContext";
import { useGlobalStore } from "../../../store/globalStore";
import Fuse from "fuse.js";
import { createNewEmptyOrderItem } from "../utils";

interface useOrderItemProps {
  idx: number;
  item: TOrderItemFormSchema;
}

const useOrderItem = ({ idx, item }: useOrderItemProps) => {
  const { addNewOrderItem, orderItems, updateOrderItem } = useOrderContext();

  const productVariants = useGlobalStore((state) =>
    state.getAllProductVariantsWithDetails()
  );

  const [selectedProductVariant, setSelectedProductVariant] =
    useState<TProductVariantWithDetails | null>(null);

  const [total, setTotal] = useState(0);

  const {
    register,
    control,
    watch,
    setFocus,
    setValue: setFormValue,
    formState: { errors: formErrors },
  } = useForm<TOrderItemFormSchema>({
    defaultValues: item,
    mode: "onChange",
  });

  // watch for changes in the form and update the total
  useEffect(() => {
    const subscription = watch((data) => {
      try {
        const item = OrderItemFormSchema.validateSync(data);
        setTotal(item.quantity * item.unitPrice - item.discount);
        console.log("item", item);
        updateOrderItem(idx, item);
      } catch (e) {
        // errors are expected but it will get fixed on next render

        // if there is an error set total to 0
        setTotal(0);

        // if there is an error set the item to empty
        updateOrderItem(idx, createNewEmptyOrderItem());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [idx, updateOrderItem, watch]);

  // focus on the next field when enter is pressed
  const focusFieldOnEnter = (field: keyof TOrderItemFormSchema) => {
    return (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        setFocus(field);
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
    register,
    formErrors,
    control,
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter: addNewOrderItemOnEnter,
    setFocus,
    total,
    fuse,
    watch,
    setFormValue,
    selectedProductVariant,
    setSelectedProductVariant,
  };
};

export default useOrderItem;
