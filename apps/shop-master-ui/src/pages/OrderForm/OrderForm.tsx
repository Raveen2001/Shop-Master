import { FC } from "react";
import useOrderForm from "./useOrderForm";
import {
  Box,
  Typography,
  Card,
  ProfileImagePicker,
  Button,
  TextField,
  LoadingButton,
  Snackbar,
  Alert,
  SingleSelectSearch,
} from "ui";
import { OrderProvider } from "./OrderContext";
import OrderItems from "./components/OrderItems";

const OrderForm: FC = () => {
  return (
    <OrderProvider>
      <_OrderForm />
    </OrderProvider>
  );
};

const _OrderForm: FC = () => {
  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    setProfileImage,
    shop,
    owner,
    productVariants,
  } = useOrderForm();
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Order</Typography>

      <Box className="h-8" />

      <Card elevation={5} className="isolate overflow-visible p-6">
        <OrderItems />
      </Card>

      <Snackbar
        open={isMutateError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {mutateError?.response?.data.error ??
            "Something went wrong, please try again later"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderForm;
