import { yupResolver } from "@hookform/resolvers/yup";
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

  const [subTotal, setSubTotal] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormValue,
    getValues: getFormValues,
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

  const updateSubTotal = useCallback(() => {
    const items = getFormValues("items");
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += item.unitPrice * item.quantity - item.discount;
    });

    setSubTotal(subTotal);
  }, [getFormValues]);

  const delivery = watch("delivery", 0);
  const discount = watch("discount", 0);
  const tax = watch("tax", 0);

  useEffect(() => {
    console.log("subTotal", subTotal);
    const total = subTotal + Number(delivery) - Number(discount) + Number(tax);
    setFormValue("subTotal", subTotal);
    setFormValue("totalAmount", total);
  }, [delivery, discount, setFormValue, subTotal, tax, watch]);

  const addNewOrderItem = useCallback(() => {
    append(createNewEmptyOrderItem());
  }, [append]);

  const updateOrderItem = useCallback(
    (idx: number, data: TOrderItemFormSchema) => {
      setFormValue(`items.${idx}`, data);
      updateSubTotal();
    },
    [setFormValue, updateSubTotal]
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
