import { FC } from "react";
import moment from "moment";

import useCustomerPaymentForm from "./useCustomerPaymentForm";
import {
  Box,
  Typography,
  Card,
  TextField,
  LoadingButton,
  Snackbar,
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  DateTimePicker,
  TableProfileCell,
} from "ui";
import { CUSTOMER_PAYEMENT_TYPES } from "schema";

const CustomerPaymentForm: FC = () => {
  const {
    formErrors,
    isMutateLoading,
    isError,
    handleSubmit,
    mutate,
    networkError,
    owner,
    customers,
    selectedShop,
    setFormValue,
    getFormValue,
    register,
  } = useCustomerPaymentForm();

  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Customer Payment</Typography>

      <Box className="h-8" />

      <Card elevation={5} className="p-6">
        <form
          onSubmit={handleSubmit((data) => {
            mutate(data);
          })}
          className="flex h-full flex-col gap-4"
        >
          <Box className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
            <Box className="flex flex-col gap-4">
              <FormControl error={!!formErrors.customerPhone}>
                <InputLabel id="customer-label">Customer *</InputLabel>
                <Select
                  labelId="customer-label"
                  id="customerId"
                  {...register("customerPhone")}
                  label="Customer *"
                  defaultValue={""}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.phone} value={customer.phone}>
                      <TableProfileCell
                        name={customer.name}
                        subText={customer.type}
                        imageUrl={customer.image}
                      />
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {formErrors.customerPhone?.message}
                </FormHelperText>
              </FormControl>

              <FormControl error={!!formErrors.type}>
                <InputLabel id="type-label">Type *</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  {...register("type")}
                  label="Type *"
                  defaultValue={""}
                >
                  {CUSTOMER_PAYEMENT_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>{formErrors.type?.message}</FormHelperText>
              </FormControl>
              <TextField
                label="Amount *"
                type="number"
                {...register("amount")}
                error={!!formErrors.amount}
                helperText={formErrors.amount?.message}
              />

              <FormControl error={!!formErrors.createdAt}>
                <DateTimePicker
                  label="Created at *"
                  format="DD/MM/YYYY hh:mm A"
                  defaultValue={moment(getFormValue("createdAt"))}
                  onAccept={(date) => {
                    if (!date) return;
                    setFormValue("createdAt", date.toDate());
                  }}
                />
                <FormHelperText>{formErrors.createdAt?.message}</FormHelperText>
              </FormControl>
            </Box>
            <Box className="flex flex-col gap-4">
              <TextField
                label="Shop"
                value={selectedShop?.name ?? ""}
                contentEditable={false}
              />
              <TextField
                label="Owner"
                defaultValue={owner?.name}
                contentEditable={false}
              />
              <TextField
                label="Comment"
                {...register("comment")}
                error={!!formErrors.comment}
                helperText={formErrors.comment?.message}
                multiline
                rows={4}
              />
            </Box>
          </Box>

          <LoadingButton
            loading={isMutateLoading}
            variant="contained"
            className="float-right"
            type="submit"
          >
            Create New Payment
          </LoadingButton>
        </form>
      </Card>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {networkError?.response?.data.error ??
            "Something went wrong, please try again later"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerPaymentForm;
