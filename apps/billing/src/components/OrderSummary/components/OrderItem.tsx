import { Box, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { QuantitySelector } from "ui";
import { useBillingStore } from "../../../store/billingStore";
import { TOrderItemFormSchema } from "schema";
import { useGlobalStore } from "../../../store";

type OrderItemProps = {
  orderItem: TOrderItemFormSchema;
};

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const store = useGlobalStore();
  const { removeOrderItem, updateOrderItemQuantity } = useBillingStore();

  // Early return if productVariantId is undefined
  if (!orderItem.productVariantId) {
    return null;
  }

  const productVariantId = orderItem.productVariantId;
  const isCustomItem = productVariantId.startsWith("custom-");

  const productVariant = !isCustomItem
    ? store.productVariants.find((product) => product.id === productVariantId)
    : null;

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
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "text.primary",
              fontSize: "18px",
              marginBottom: "2px",
            }}
          >
            {isCustomItem
              ? "<no name>"
              : productVariant?.tamilName || productVariant?.name}
          </Typography>
          {!isCustomItem && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "16px" }}
            >
              {productVariant?.noOfUnits} {productVariant?.unit}
            </Typography>
          )}
          {isCustomItem && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "16px" }}
            >
              ₹{orderItem.unitPrice}
            </Typography>
          )}
        </Box>

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
