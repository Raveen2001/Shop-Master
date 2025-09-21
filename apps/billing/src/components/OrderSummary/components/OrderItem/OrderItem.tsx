import { Box, IconButton, Typography, TextField } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { QuantitySelector } from "ui";
import { useBillingStore } from "../../../../store/billingStore";
import { TOrderItemFormSchema } from "schema";
import { useGlobalStore } from "../../../../store";
import { useState } from "react";
import EditableName from "./EditableName";
import EditablePrice from "./EditablePrice";

type OrderItemProps = {
  orderItem: TOrderItemFormSchema;
};

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const store = useGlobalStore();
  const { removeOrderItem, updateOrderItemQuantity, updateOrderItemUnitPrice } =
    useBillingStore();

  // Early return if productVariantId is undefined
  if (!orderItem.productVariantId) {
    return null;
  }

  const productVariantId = orderItem.productVariantId;
  const isCustomItem = productVariantId.startsWith("custom-");

  const productVariant = !isCustomItem
    ? store.productVariants.find((product) => product.id === productVariantId)
    : null;

  const getDisplayName = () => {
    if (orderItem.customProductName) return orderItem.customProductName;
    return productVariant?.tamilName || productVariant?.name || "<no name>";
  };

  return (
    <Box
      sx={{
        padding: "12px",
        border: isCustomItem
          ? "1px solid #FF9F43"
          : productVariant?.onlyForBilling
          ? "1px solid #3F9EFF"
          : "1px solid #e0e0e0",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <EditableName
              name={getDisplayName()}
              productVariantId={productVariantId}
            />
            <IconButton
              size="small"
              onClick={() => removeOrderItem(productVariantId)}
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
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            {!isCustomItem ? (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "16px" }}
              >
                {productVariant?.noOfUnits} {productVariant?.unit}
              </Typography>
            ) : (
              <div></div>
            )}

            <EditablePrice
              price={orderItem.unitPrice}
              productVariantId={productVariantId}
            />
          </Box>
        </Box>
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
              updateOrderItemQuantity(productVariantId, quantity)
            }
            onRemoveQuantity={() => removeOrderItem(productVariantId)}
          />
          {productVariant?.onlyForBilling && (
            <Typography
              variant="body2"
              sx={{ fontSize: "16px", minWidth: "50px" }}
            >
              {orderItem.quantity * (productVariant?.noOfUnits ?? 1)}{" "}
              {productVariant?.unit}
            </Typography>
          )}
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
    </Box>
  );
};

export default OrderItem;
