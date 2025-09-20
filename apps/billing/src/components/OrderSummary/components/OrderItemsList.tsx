import { Box } from "ui";
import { TOrderItemFormSchema } from "schema";
import { Typography } from "@mui/material";
import OrderItem from "./OrderItem/OrderItem";

type OrderItemsListProps = {
  items: TOrderItemFormSchema[];
};

const OrderItemsList = ({ items }: OrderItemsListProps) => (
  <Box
    sx={{
      flex: 1,
      overflowY: "auto",
      marginBottom: "16px",
    }}
  >
    {items.length === 0 ? (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "120px",
          color: "text.secondary",
        }}
      >
        <Typography variant="body2" sx={{ marginBottom: "8px" }}>
          No items selected
        </Typography>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          Select products and variants to add to your bill
        </Typography>
      </Box>
    ) : (
      items.map((item) => (
        <OrderItem key={item.productVariantId} orderItem={item} />
      ))
    )}
  </Box>
);

export default OrderItemsList;
