import React from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";

import { TProductVariantData } from "schema";
import { useBillingStore } from "../../store/billingStore";
import OrderItem from "./OrderItem";

interface OrderItem {
  variant: TProductVariantData;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface OrderSummaryProps {
  onPrintBill: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ onPrintBill }) => {
  const { orderItems, updateOrderItemQuantity, removeOrderItem } =
    useBillingStore();

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        // Tablet-friendly adjustments
        "@media (max-width: 1024px)": {
          padding: "16px",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          marginBottom: "20px",
          textAlign: "center",
          color: "text.primary",
        }}
      >
        Order Summary
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {orderItems.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              color: "text.secondary",
            }}
          >
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              No items selected
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Select products and variants to add to your bill
            </Typography>
          </Box>
        ) : (
          orderItems.map((item) => (
            <OrderItem key={item.variant.id} orderItem={item} />
          ))
        )}
      </Box>

      <Divider sx={{ margin: "16px 0" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Total Amount
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "success.main",
          }}
        >
          ₹{totalAmount}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={onPrintBill}
        disabled={orderItems.length === 0}
        sx={{
          backgroundColor: "#2196f3",
          "&:hover": {
            backgroundColor: "#1976d2",
          },
          padding: "12px",
          fontSize: "16px",
          fontWeight: 600,
          borderRadius: "8px",
        }}
      >
        Print Bill
      </Button>
    </Box>
  );
};
