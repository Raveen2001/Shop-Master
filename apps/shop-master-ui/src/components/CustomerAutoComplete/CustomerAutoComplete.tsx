import * as React from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { TCustomerDataForSelect } from "schema";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  createFilterOptions,
} from "ui";
import CustomerForm from "../../pages/CustomerForm";
import UseCustomerAutoComplete from "./UseCustomerAutoComplete";

const filter = createFilterOptions<TCustomerDataForSelect>({});

type TCustomerAutoCompleteProps = {
  control: Control<any>;
  setFormValue: UseFormSetValue<any>;
};

export default function CustomerAutoComplete({
  control,
  setFormValue,
}: TCustomerAutoCompleteProps) {
  const {
    customers,
    open,
    toggleOpen,
    customerPhone,
    setCustomerPhone,
    customerFuse,
  } = UseCustomerAutoComplete();

  return (
    <React.Fragment>
      <Controller
        name="customerPhone"
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <Autocomplete
            fullWidth
            {...field}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                  toggleOpen(true);
                  setCustomerPhone(newValue);
                });
              } else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setCustomerPhone(newValue.inputValue);
              } else {
                onChange(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = customerFuse
                .search(params.inputValue)
                .map((r) => r.item) as TCustomerDataForSelect[];

              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  phone: params.inputValue,
                  name: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            id="customer-phone"
            options={customers}
            getOptionLabel={(option) => {
              // e.g. value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => (
              <Box component={"li"} {...(props as any)} key={option.id}>
                <Box className="flex flex-col">
                  <Typography variant="body2" className="font-semibold">
                    {option.name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {option.phone}
                  </Typography>
                </Box>
              </Box>
            )}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...(params as any)}
                label="Search Customer..."
                fullWidth
              />
            )}
          />
        )}
      />
      <Dialog open={open} onClose={() => toggleOpen(false)} maxWidth="lg">
        <DialogContent>
          <CustomerForm
            onCustomerAdded={(customer) => {
              setFormValue("customerPhone", customer.phone);
              toggleOpen(false);
            }}
            initalData={{
              phone: customerPhone,
              type: "INDIVIDUAL",
            }}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
