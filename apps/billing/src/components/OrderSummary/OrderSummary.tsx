import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";

import { useBillingStore } from "../../store/billingStore";
import OrderItem from "./OrderItem";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { AddCustomItemModal } from "../AddCustomItemModal";
import { CustomItemFormData } from "../AddCustomItemModal/AddCustomItemModal";

interface OrderSummaryProps {
  onPrintBill: () => void;
  isCreatingOrder: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  onPrintBill,
  isCreatingOrder,
}) => {
  const { order, clearOrder, addCustomItemToOrder, getOrderItemCount } =
    useBillingStore();
  const [isCustomItemModalOpen, setIsCustomItemModalOpen] = useState(false);

  const handleAddCustomItem = (customItem: CustomItemFormData) => {
    addCustomItemToOrder(customItem);
    setIsCustomItemModalOpen(false);
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Order Summary ({getOrderItemCount()})
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton
            onClick={() => setIsCustomItemModalOpen(true)}
            sx={{
              color: "primary.main",
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            size="small"
          >
            <AddIcon />
          </IconButton>
          <IconButton onClick={clearOrder} sx={{ color: "error.main" }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {order.items.length === 0 ? (
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
          order.items.map((item) => (
            <OrderItem key={item.productVariantId} orderItem={item} />
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
          ₹{order.total}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={onPrintBill}
        disabled={order.items.length === 0 || isCreatingOrder}
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
        {isCreatingOrder ? "Creating Order..." : "Print Bill"}
      </Button>

      <AddCustomItemModal
        open={isCustomItemModalOpen}
        onClose={() => setIsCustomItemModalOpen(false)}
        onAddItem={handleAddCustomItem}
      />
    </Box>
  );
};
