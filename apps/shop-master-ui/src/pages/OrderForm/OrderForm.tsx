import { FC } from "react";
import useOrderForm from "./useOrderForm";
import { Box, Typography, Card, Button, Snackbar, Alert } from "ui";
import { OrderProvider, useOrderContext } from "./OrderContext";
import OrderItems from "./components/OrderItems";
import { AddTwoTone } from "ui/icons";

const OrderForm: FC = () => {
  return (
    <OrderProvider>
      <_OrderForm />
    </OrderProvider>
  );
};

const _OrderForm: FC = () => {
  const { addNewOrderItem } = useOrderContext();
  const { isMutateError, isMutateLoading, mutateError } = useOrderForm();
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Order</Typography>

      <Box className="h-8" />

      <Card
        elevation={5}
        className="isolate flex flex-col items-start gap-4 overflow-visible p-6"
      >
        <OrderItems />

        <Button
          variant="text"
          color="success"
          startIcon={<AddTwoTone />}
          onClick={addNewOrderItem}
        >
          Add item
        </Button>
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
