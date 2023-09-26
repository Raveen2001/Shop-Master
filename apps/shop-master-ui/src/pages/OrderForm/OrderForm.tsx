import { FC } from "react";
import { Alert, Box, Card, Snackbar, Typography } from "ui";
import { OrderProvider, useOrderContext } from "./OrderContext";
import OrderItems from "./components/OrderItems";
import useOrderForm from "./useOrderForm";
import OrderSummary from "./components/OrderSummary";

const OrderForm: FC = () => {
  return (
    <OrderProvider>
      <_OrderForm />
    </OrderProvider>
  );
};

const _OrderForm: FC = () => {
  const { isMutateError, isMutateLoading, mutateError } = useOrderForm();
  const { onSubmit } = useOrderContext();
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Order</Typography>

      <Box className="h-8" />

      <form onSubmit={onSubmit}>
        <Card
          elevation={5}
          className="isolate flex flex-col items-start gap-4 overflow-visible p-6"
        >
          <OrderItems />
          <OrderSummary />
        </Card>
      </form>

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
