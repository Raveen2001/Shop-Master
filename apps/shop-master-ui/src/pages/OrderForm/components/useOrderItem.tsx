import { KeyboardEvent, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { OrderFormSchema, TOrderItemForm } from "schema";
import { useOrderContext } from "../OrderContext";
import { createOptions } from "ui";
import { useGlobalStore } from "../../../store/globalStore";
import { yupResolver } from "@hookform/resolvers/yup";

interface useOrderItemProps {
  idx: number;
  item: TOrderItemForm;
}

const useOrderItem = ({ idx, item }: useOrderItemProps) => {
  const { setOrderItem, addNewOrderItem, orderItems } = useOrderContext();
  const productVariants = useGlobalStore((state) =>
    state.getAllProductVariantsWithDetails()
  );

  const productOptions = useMemo(
    () =>
      createOptions(productVariants, {
        label: "name",
        value: "id",
        subLabel: "brand.name",
      }),
    [productVariants]
  );

  const {
    register,
    control,
    watch,
    setFocus,
    formState: { errors: formErrors },
  } = useForm<TOrderItemForm>({
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
      console.log(data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [idx, item, setOrderItem, watch]);

  const selectedVariant = watch("productVariant");

  const focusFieldOnEnter = (field: keyof TOrderItemForm) => {
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

  return {
    register,
    formErrors,
    control,
    selectedVariant,
    productOptions,
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter: addNewOrderItemOnEnter,
    setFocus,
    totalAmount,
  };
};

export default useOrderItem;
