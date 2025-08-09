import { Box, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { QuantitySelector } from "ui";
import { TOrderItem, useBillingStore } from "../../store/billingStore";

type OrderItemProps = {
  orderItem: TOrderItem;
};

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const { removeOrderItem, updateOrderItemQuantity } = useBillingStore();
  return (
    <Box
      sx={{
        padding: "12px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "12px",
        backgroundColor: "#fafafa",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "text.primary",
              fontSize: "18px",
              marginBottom: "2px",
            }}
          >
            {orderItem.productName}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "16px" }}
          >
            {orderItem.variant.name} - {orderItem.variant.noOfUnits}{" "}
            {orderItem.variant.unit}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={() => removeOrderItem(orderItem.variant.id)}
          sx={{
            color: "error.main",
            padding: "4px",
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <QuantitySelector
            quantity={orderItem.quantity}
            onUpdateQuantity={(quantity) =>
              updateOrderItemQuantity(orderItem.variant.id, quantity)
            }
          />
          <Typography variant="body2" sx={{ fontSize: "16px" }}>
            {orderItem.totalQuantityWithUnit}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "success.main",
            fontSize: "18px",
          }}
        >
          ₹{orderItem.totalPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderItem;
