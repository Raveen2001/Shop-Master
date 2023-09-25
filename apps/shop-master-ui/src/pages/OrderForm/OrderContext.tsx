import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  TOrderItemFormSchema,
  TProductVariantWithProductDetails,
} from "schema";
import { useGlobalStore } from "../../store/globalStore";

type TOrderContext = {
  orderItems: (TOrderItemFormSchema | null)[];
  setOrderItem: (orderItemIdx: number, orderItem: TOrderItemFormSchema) => void;
  addNewOrderItem: () => void;
  removeOrderItem: (orderItemIdx: number) => void;
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
    null,
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
    setOrderItems((prev) => [...prev, null]);
  }, []);

  const removeOrderItem = useCallback(
    (orderItemIdx: number) => {
      setOrderItems((prev) => {
        const newOrderItems = [...prev];
        newOrderItems.splice(orderItemIdx, 1);
        return newOrderItems;
      });
    },
    [setOrderItems]
  );
  return (
    <OrderContext.Provider
      value={{
        orderItems,
        setOrderItem,
        addNewOrderItem,
        removeOrderItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
