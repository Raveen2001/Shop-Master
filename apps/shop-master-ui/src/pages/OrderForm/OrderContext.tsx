import { yupResolver } from "@hookform/resolvers/yup";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { OrderFormSchema, TOrderData1, TOrderItemFormSchema } from "schema";
import { useGlobalStore } from "../../store/globalStore";
import { createNewEmptyOrderItem } from "./utils";

type TOrderContext = {
  orderItems: FieldArrayWithId<TOrderData1, "items", "id">[];
  addNewOrderItem: () => void;
  updateOrderItem: (idx: number, data: TOrderItemFormSchema) => void;
  removeOrderItem: (index: number) => void;

  register: UseFormRegister<TOrderData1>;
  watch: UseFormWatch<TOrderData1>;
  formErrors: FieldErrors<TOrderData1>;
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormValue,
    watch,
  } = useForm<TOrderData1>({
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
      paymentType: "CASH",
      items: [createNewEmptyOrderItem()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    keyName: "id",
  });

  const onSubmit = handleSubmit((data) => {
    data;
  });

  const orderItems = watch("items", []);

  const subTotal = useMemo(() => {
    let subTotal = 0;
    orderItems.forEach((item) => {
      subTotal += item.unitPrice * item.quantity - item.discount;
    });
    return subTotal;
  }, [orderItems]);

  const delivery = watch("delivery", 0);
  const discount = watch("discount", 0);
  const tax = watch("tax", 0);

  useEffect(() => {
    const total = subTotal + Number(delivery) - Number(discount) + Number(tax);
    setFormValue("subTotal", subTotal);
    setFormValue("totalAmount", total);
  }, [delivery, discount, orderItems, setFormValue, subTotal, tax, watch]);

  const addNewOrderItem = useCallback(() => {
    append(createNewEmptyOrderItem());
  }, [append]);

  const updateOrderItem = useCallback(
    (idx: number, data: TOrderItemFormSchema) => {
      setFormValue(`items.${idx}`, data);
    },
    [setFormValue]
  );
  const removeOrderItem = useCallback(
    (index: number) => {
      remove(index);

      // if it is the last item, add new item
      if (fields.length === 1) {
        addNewOrderItem();
      }
    },
    [addNewOrderItem, fields.length, remove]
  );

  return (
    <OrderContext.Provider
      value={{
        orderItems: fields,
        addNewOrderItem,
        removeOrderItem,
        updateOrderItem,

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
