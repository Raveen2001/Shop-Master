import { Autocomplete } from "@mui/material";
import fuse from "fuse.js";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { Box, TextField, Typography } from "ui";
import { useOrderContext } from "../OrderContext";

const OrderHeader: FC = () => {
  const { control, productVariants } = useOrderContext();
  return (
    <Box className="flex">
      <Box className="flex-1 border-r-2 border-dotted border-slate-300">
        <Controller
          name={`items.customerPhone`}
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
      </Box>
      <Box className="flex-1"></Box>
    </Box>
  );
};

export default OrderHeader;
