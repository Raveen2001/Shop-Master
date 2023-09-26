import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  OrderFormSchema,
  TOrderFormSchema,
  TOrderItemForm,
  TTempOrderItemForm,
} from "schema";
import { createNewEmptyOrderItem } from "./utils";
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalStore } from "../../store/globalStore";

type TOrderContext = {
  orderItems: TTempOrderItemForm[];
  setOrderItem: (orderItemIdx: number, orderItem: TTempOrderItemForm) => void;
  addNewOrderItem: () => void;
  removeOrderItem: (orderItemIdx: number) => void;

  register: UseFormRegister<TOrderFormSchema>;
  watch: UseFormWatch<TOrderFormSchema>;
  formErrors: FieldErrors<TOrderFormSchema>;
  onSubmit: () => Promise<void>;
};

const OrderContext = createContext<TOrderContext | null>(null);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);
  const [orderItems, setOrderItems] = useState<TOrderContext["orderItems"]>([
    createNewEmptyOrderItem(),
  ]);
  const setOrderItem = useCallback<TOrderContext["setOrderItem"]>(
    (orderItemIds, orderItem) => {
      setOrderItems((prev) => {
        const newOrderItems = [...prev];
        newOrderItems[orderItemIds] = orderItem;
        return newOrderItems;
      });
    },
    []
  );

  const addNewOrderItem = useCallback(() => {
    setOrderItems((prev) => [...prev, createNewEmptyOrderItem()]);
  }, []);

  const removeOrderItem = useCallback(
    (orderItemIdx: number) => {
      setOrderItems((prev) => {
        const newOrderItems = [...prev];
        newOrderItems.splice(orderItemIdx, 1);

        if (newOrderItems.length === 0) {
          newOrderItems.push(createNewEmptyOrderItem());
        }
        return newOrderItems;
      });
    },
    [setOrderItems]
  );

  const {
    register,
    setValue: setFormValue,
    watch,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TOrderFormSchema>({
    resolver: yupResolver(OrderFormSchema as any),
    defaultValues: {
      ownerId: owner?.id,
      shopId: selectedShop?.id,
      createdByEmployeeId: null,
      totalAmount: 0,
      subTotal: 0,
      delivery: 0,
      discount: 0,
      tax: 0,
      customerPhone: "123",
      amountPaid: 100,
      isDraft: false,
      paymentType: "CARD",
    },
  });

  const validOrderItems = useMemo(() => {
    const validOrderItems: TOrderItemForm[] = [];
    orderItems.forEach((item) => {
      if (item.productVariant && item.quantity && item.quantity > 0) {
        validOrderItems.push({
          productVariantId: item.productVariant.id,
          unitPrice: item.productVariant.salePrice,
          quantity: item.quantity,
          discount: item.discount ?? 0,
        });
      }
    });
    return validOrderItems;
  }, [orderItems]);

  const subTotal = useMemo(() => {
    let subTotal = 0;
    validOrderItems.forEach((item) => {
      subTotal += item.unitPrice * item.quantity;
      subTotal -= item.discount;
    });
    return subTotal;
  }, [validOrderItems]);

  const delivery = watch("delivery");
  const discount = watch("discount");
  const tax = watch("tax");

  useEffect(() => {
    const total = subTotal + Number(delivery) - Number(discount) + Number(tax);
    setFormValue("subTotal", subTotal);
    setFormValue("totalAmount", total);
  }, [delivery, discount, orderItems, setFormValue, subTotal, tax, watch]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <OrderContext.Provider
      value={{
        orderItems,
        setOrderItem,
        addNewOrderItem,
        removeOrderItem,
        register,
        watch,
        formErrors,
        onSubmit,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
