import React from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { TProductVariantData } from "schema";

interface OrderItem {
  variant: TProductVariantData;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (variantId: string, newQuantity: number) => void;
  onRemoveItem: (variantId: string) => void;
  onPrintBill: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onPrintBill,
}) => {
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
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
            <Box
              key={item.variant.id}
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
                      fontSize: "14px",
                      marginBottom: "2px",
                    }}
                  >
                    {item.productName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "12px" }}
                  >
                    {item.variant.name} - {item.variant.noOfUnits}{" "}
                    {item.variant.unit}
                  </Typography>
                </Box>

                <IconButton
                  size="small"
                  onClick={() => onRemoveItem(item.variant.id)}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      onUpdateQuantity(
                        item.variant.id,
                        Math.max(1, item.quantity - 1),
                      )
                    }
                    disabled={item.quantity <= 1}
                    sx={{
                      padding: "4px",
                      borderRadius: 0,
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      padding: "4px 12px",
                      minWidth: "40px",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() =>
                      onUpdateQuantity(item.variant.id, item.quantity + 1)
                    }
                    sx={{
                      padding: "4px",
                      borderRadius: 0,
                      borderLeft: "1px solid #e0e0e0",
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "success.main",
                    fontSize: "16px",
                  }}
                >
                  ₹{item.totalPrice}
                </Typography>
              </Box>
            </Box>
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
