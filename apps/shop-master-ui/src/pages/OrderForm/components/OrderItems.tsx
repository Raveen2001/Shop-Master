import { FC } from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, Box, Button, TextField } from "ui";
import { DeleteTwoTone } from "ui/icons";
import { useOrderContext } from "../OrderContext";
import useOrderItem from "./useOrderItem";
import { TOrderItemFormSchema } from "schema";

interface OrderItemProps {
  orderIdx: number;
  orderItem: TOrderItemFormSchema;
}

const OrderItem: FC<OrderItemProps> = ({ orderIdx, orderItem }) => {
  const { removeOrderItem } = useOrderContext();

  const {
    control,
    register,
    formErrors,
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter,
    setFocus,
    total,
    fuse,
    selectedProductVariant,
    setSelectedProductVariant,
    setFormValue,
    watch,
  } = useOrderItem({
    idx: orderIdx,
    item: orderItem,
  });

  return (
    <Box className="border-b-2 border-dotted border-stone-300">
      <Box className="flex w-full gap-2">
        <Controller
          name="productVariantId"
          control={control}
          render={({ field: { onChange, value, ...field } }) => {
            return (
              <Autocomplete
                options={productVariants}
                fullWidth
                {...field}
                onChange={(e, productVariant) => {
                  if (productVariant) {
                    setSelectedProductVariant(productVariant);
                    onChange(productVariant.id);
                    setFormValue("unitPrice", productVariant.salePrice);
                    setFocus("quantity");
                  } else {
                    setSelectedProductVariant(null);
                    onChange("");
                    setFormValue("unitPrice", 0);
                  }
                }}
                filterOptions={(_, state) => {
                  return fuse
                    .search(state.inputValue)
                    .map((result) => result.item);
                }}
                value={selectedProductVariant}
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
          className="w-72"
          label="Variant"
          disabled
          value={selectedProductVariant?.name ?? ""}
        />

        <TextField
          className="w-48"
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
          className="w-48"
          label="Price"
          type="number"
          disabled
          value={watch("unitPrice")}
        />
        <TextField
          className="w-48"
          label="Discount"
          type="number"
          error={!!formErrors.discount}
          {...register("discount", { min: 0, required: true })}
          onFocus={(event) => {
            event.target.select();
          }}
        />
        <TextField
          className="w-72"
          label="Total"
          type="number"
          value={total}
          disabled
        />
      </Box>
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
        <OrderItem key={orderItem.id} orderIdx={idx} orderItem={orderItem} />
      ))}
    </Box>
  );
};

export default OrderItems;
