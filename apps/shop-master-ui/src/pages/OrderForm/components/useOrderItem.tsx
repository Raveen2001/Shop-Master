import { KeyboardEvent, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TTempOrderItemForm } from "schema";
import { useOrderContext } from "../OrderContext";
import { useGlobalStore } from "../../../store/globalStore";
import Fuse from "fuse.js";

interface useOrderItemProps {
  idx: number;
  item: TTempOrderItemForm;
}

const useOrderItem = ({ idx, item }: useOrderItemProps) => {
  const { setOrderItem, addNewOrderItem, orderItems } = useOrderContext();
  const productVariants = useGlobalStore((state) =>
    state.getAllProductVariantsWithDetails()
  );

  const {
    register,
    control,
    watch,
    setFocus,
    formState: { errors: formErrors },
  } = useForm<TTempOrderItemForm>({
    defaultValues: {
      // default values
      quantity: 0,
      discount: 0,

      // override default values
      ...item,
    },
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((data) => {
      setOrderItem(idx, data as any);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [idx, item, setOrderItem, watch]);

  const selectedVariant = watch("productVariant");

  const focusFieldOnEnter = (field: keyof TTempOrderItemForm) => {
    return (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        setFocus(field);
      }
    };
  };

  const addNewOrderItemOnEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    // if it is not the last item don't add new item
    if (orderItems.length != idx + 1) return;

    if (e.key === "Enter") {
      addNewOrderItem();
    }
  };

  const [quantity = 0, unitPrice = 0, discount = 0] = watch([
    "quantity",
    "productVariant.salePrice",
    "discount",
  ]);

  const totalAmount = quantity * unitPrice - discount;

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
    selectedVariant,
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter: addNewOrderItemOnEnter,
    setFocus,
    totalAmount,
    fuse,
  };
};

export default useOrderItem;
