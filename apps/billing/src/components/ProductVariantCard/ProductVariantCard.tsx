import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import { TProductVariantData } from "schema";
import { useBillingStore } from "../../store/billingStore";
import { QuantitySelector } from "ui";

interface ProductVariantCardProps {
  variant: TProductVariantData;
}

export const ProductVariantCard: React.FC<ProductVariantCardProps> = ({
  variant,
}) => {
  const { addToOrder, updateOrderItemQuantity, order } = useBillingStore();

  const isVariantAddedToOrder = order.items.some(
    (item) => item.productVariantId === variant.id
  );

  return (
    <Box
      sx={{
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: variant.onlyForBilling
          ? "1px solid #3F9EFF"
          : "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        maxHeight: "200px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "16px",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            {variant.tamilName || variant.name}
          </Typography>
        </Box>

        <Chip
          label={`${variant.noOfUnits} ${variant.unit}`}
          size="medium"
          sx={{
            backgroundColor: "#e8f5e8",
            color: "success.main",
            fontSize: "16px",
            height: "24px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "12px", marginBottom: "2px" }}
          >
            Sale Price
          </Typography>
          <Typography
            variant="h6"
            color="success.main"
            sx={{ fontWeight: 600, fontSize: "18px" }}
          >
            ₹{variant.salePrice}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "12px", marginBottom: "2px" }}
          >
            MRP
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textDecoration: "line-through",
              color: "text.secondary",
              fontSize: "14px",
            }}
          >
            ₹{variant.mrp}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "12px" }}
        >
          {variant.availability ? "In Stock" : "Out of Stock"}
        </Typography>

        {!isVariantAddedToOrder ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              addToOrder(variant);
            }}
            sx={{
              fontSize: "12px",
              padding: "6px 16px",
              minWidth: "80px",
            }}
          >
            Select
          </Button>
        ) : (
          <QuantitySelector
            quantity={
              order.items.find((item) => item.productVariantId === variant.id)
                ?.quantity || 1
            }
            onUpdateQuantity={(quantity) =>
              updateOrderItemQuantity(variant.id, quantity)
            }
          />
        )}
      </Box>
    </Box>
  );
};
