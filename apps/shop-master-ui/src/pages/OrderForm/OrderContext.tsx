import { yupResolver } from "@hookform/resolvers/yup";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { IRequestError, OrderFormSchema, TOrderFormSchema } from "schema";
import { useGlobalStore } from "../../store/globalStore";
import { createNewEmptyOrderItem } from "./utils";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/order";

type TOrderContext = {
  isMutateLoading: boolean;
  isMutateError: boolean;
  mutateError: IRequestError | null;
  orderItems: FieldArrayWithId<TOrderFormSchema, "items", "id">[];
  addNewOrderItem: () => void;
  removeOrderItem: (index: number) => void;
  control: Control<TOrderFormSchema>;
  register: UseFormRegister<TOrderFormSchema>;
  watch: UseFormWatch<TOrderFormSchema>;
  formErrors: FieldErrors<TOrderFormSchema>;
  setFormValue: UseFormSetValue<TOrderFormSchema>;
  setFormFocus: UseFormSetFocus<TOrderFormSchema>;
  onSubmit: (status: TOrderFormSchema["status"]) => () => void;
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

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createOrder>>,
    IRequestError,
    TOrderFormSchema
  >({
    mutationKey: ["order", "create"],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["shop", selectedShop?.id, "orders"]);
      navigate("/orders");
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormValue,
    setFocus: setFormFocus,
    watch,
  } = useForm<TOrderFormSchema>({
    resolver: yupResolver(OrderFormSchema as any),
    defaultValues: {
      ownerId: owner?.id,
      shopId: selectedShop?.id,
      createdByEmployeeId: null,
      total: 0,
      subTotal: 0,
      delivery: 0,
      discount: 0,
      tax: 0,
      customerPhone: "",
      type: "OFFLINE",
      createdAt: new Date(),

      items: [createNewEmptyOrderItem()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (status: TOrderFormSchema["status"]) => {
    return () => {
      setFormValue("status", status);
      handleSubmit((data) => {
        if (!data.customerPhone) delete data.customerPhone;
        mutate(data);
      })();
    };
  };

  useEffect(() => {
    const sub = watch((data) => {
      const items = data.items;

      if (!items) return;

      let subTotal = 0;
      items.forEach((item) => {
        subTotal +=
          (Number(item?.unitPrice ?? 0) - Number(item?.discount ?? 0)) *
          Number(item?.quantity ?? 0);
      });

      setSubTotal(subTotal);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  const delivery = watch("delivery", 0);
  const discount = watch("discount", 0);
  const tax = watch("tax", 0);

  useEffect(() => {
    const total = subTotal + Number(delivery) - Number(discount) + Number(tax);
    setFormValue("subTotal", subTotal);
    setFormValue("total", total);
  }, [delivery, discount, setFormValue, subTotal, tax, watch]);

  const addNewOrderItem = useCallback(() => {
    append(createNewEmptyOrderItem(), {
      // workaround for disabling focus on quantity field, "productVariantId" is not a valid field name
      focusName: "productVariantId",
    });
  }, [append]);

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
        isMutateLoading,
        isMutateError,
        mutateError,
        orderItems: fields,
        addNewOrderItem,
        removeOrderItem,
        setFormValue,
        setFormFocus,

        control,
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
