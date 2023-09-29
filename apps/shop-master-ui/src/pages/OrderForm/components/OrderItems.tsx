import { FC } from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, Box, Button, TextField, Typography } from "ui";
import { DeleteTwoTone } from "ui/icons";
import { useOrderContext } from "../OrderContext";
import useOrderItem from "./useOrderItem";
import { TOrderItemFormSchema } from "schema";

interface OrderItemProps {
  orderIdx: number;
  orderItem: TOrderItemFormSchema;
}

const OrderItem: FC<OrderItemProps> = ({ orderIdx, orderItem }) => {
  const {
    removeOrderItem,
    register,
    control,
    watch,
    formErrors,
    setFormValue,
    setFormFocus,
  } = useOrderContext();

  const {
    productVariants,
    focusFieldOnEnter,
    addNextItemOnEnter,
    total,
    fuse,
    selectedProductVariant,
    setSelectedProductVariant,
  } = useOrderItem({
    idx: orderIdx,
    item: orderItem,
  });

  return (
    <Box className="border-b-2 border-dotted border-stone-300">
      <Box className="flex w-full gap-2">
        <Controller
          name={`items.${orderIdx}.productVariantId`}
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
                    setFormValue(
                      `items.${orderIdx}.unitPrice`,
                      productVariant.salePrice
                    );
                    setFormFocus(`items.${orderIdx}.quantity`);
                  } else {
                    setSelectedProductVariant(null);
                    onChange("");
                    setFormValue(`items.${orderIdx}.unitPrice`, 0);
                  }
                }}
                filterOptions={(_, state) => {
                  return fuse
                    .search(state.inputValue)
                    .map((result) => result.item);
                }}
                renderOption={(props, option) => {
                  return (
                    <Box component={"li"} {...(props as any)} key={option.id}>
                      <Box className="flex flex-col">
                        <Typography variant="body2" className="font-semibold">
                          {option.product.name}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {option.name}
                        </Typography>
                      </Box>
                    </Box>
                  );
                }}
                getOptionLabel={(option) => option.product.name}
                autoHighlight
                autoFocus
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    error={!!formErrors.items?.[orderIdx]?.productVariantId}
                    placeholder="Search ..."
                    onFocus={(event) => {
                      event.target.select();
                    }}
                    autoFocus
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
          error={!!formErrors.items?.[orderIdx]?.quantity}
          onFocus={(event) => {
            event.target.select();
          }}
          onKeyDown={addNextItemOnEnter}
          {...register(`items.${orderIdx}.quantity`)}
        />
        <TextField
          className="w-48"
          label="Price"
          type="number"
          disabled
          value={watch(`items.${orderIdx}.unitPrice`)}
        />
        <TextField
          className="w-48"
          label="Discount"
          type="number"
          error={!!formErrors.items?.[orderIdx]?.discount}
          {...register(`items.${orderIdx}.discount`)}
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
      <Box className="mt-2 flex items-center">
        {!!formErrors.items?.[orderIdx] && (
          <Typography variant="caption" color={"error"}>
            There is a error in this item. Please fix it before proceeding.
          </Typography>
        )}
        <Box className="flex-1" />
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
