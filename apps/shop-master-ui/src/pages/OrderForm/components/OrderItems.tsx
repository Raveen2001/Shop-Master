import { FC } from "react";
import { Box, Button, TextField, Autocomplete } from "ui";
import { DeleteTwoTone } from "ui/icons";
import { useOrderContext } from "../OrderContext";
import useOrderItem from "./useOrderItem";
import { TOrderItemForm } from "schema";
import { Controller } from "react-hook-form";

interface OrderItemProps {
  orderIdx: number;
  orderItem: TOrderItemForm;
}

const OrderItem: FC<OrderItemProps> = ({ orderIdx, orderItem }) => {
  const { removeOrderItem } = useOrderContext();

  const {
    control,
    register,
    formErrors,
    productOptions,
    selectedVariant,
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter,
    setFocus,
    totalAmount,
  } = useOrderItem({
    idx: orderIdx,
    item: orderItem,
  });

  return (
    <Box className="border-b-2 border-dotted border-stone-300">
      <form>
        <Box className="flex w-full gap-2">
          <Controller
            name="productVariant"
            control={control}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Autocomplete
                  options={productVariants}
                  fullWidth
                  {...field}
                  onChange={(e, data) => {
                    onChange(data);
                    setFocus("quantity");
                  }}
                  getOptionLabel={(option) => option.name}
                  autoHighlight
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      autoFocus
                      placeholder="Search ..."
                      onFocus={(event) => {
                        event.target.select();
                      }}
                    />
                  )}
                />
              );
            }}
          />

          <TextField
            label="Variant"
            disabled
            value={selectedVariant?.name ?? ""}
          />

          <TextField
            label="Quantity"
            type="number"
            error={!!formErrors.quantity}
            {...register("quantity", { min: 1, required: true })}
            onFocus={(event) => {
              event.target.select();
            }}
            onKeyDown={addNextItemOnEnter}
          />
          <TextField
            label="Price"
            type="number"
            disabled
            value={selectedVariant?.salePrice ?? 0}
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <TextField
            label="Discount"
            type="number"
            error={!!formErrors.discount}
            {...register("discount", { min: 0, required: true })}
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <TextField label="Total" type="number" value={totalAmount} disabled />
        </Box>
      </form>
      <Box className="mt-2 flex justify-end">
        <Button
          variant="text"
          color="error"
          startIcon={<DeleteTwoTone />}
          onClick={() => removeOrderItem(orderIdx)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

const OrderItems: FC = () => {
  const { orderItems } = useOrderContext();
  return (
    <Box className="flex w-full flex-col gap-4">
      {orderItems.map((orderItem, idx) => (
        <OrderItem
          key={orderItem.clientId ?? `order ${idx}`}
          orderIdx={idx}
          orderItem={orderItem}
        />
      ))}
    </Box>
  );
};

export default OrderItems;
