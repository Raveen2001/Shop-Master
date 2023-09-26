import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { TOrderItemForm } from "schema";
import { createNewEmptyOrderItem } from "./utils";

type TOrderContext = {
  orderItems: TOrderItemForm[];
  setOrderItem: (orderItemIdx: number, orderItem: TOrderItemForm) => void;
  addNewOrderItem: () => void;
  removeOrderItem: (orderItemIdx: number) => void;

  subTotal: number;
  delivery: number;
  discount: number;
  tax: number;
  total: number;
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

  const subTotal = useMemo(() => {
    let subTotal = 0;
    orderItems.forEach((item) => {
      if (item.productVariant) {
        subTotal += item.productVariant.salePrice * (item.quantity ?? 0);
        subTotal -= item.discount ?? 0;
      }
    });
    return subTotal;
  }, [orderItems]);

  const delivery = 0;
  const discount = 0;
  const tax = 0;

  const total = useMemo(() => {
    return subTotal + delivery - discount + tax;
  }, [subTotal, delivery, discount, tax]);

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        setOrderItem,
        addNewOrderItem,
        removeOrderItem,
        subTotal,
        delivery,
        discount,
        tax,
        total,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
