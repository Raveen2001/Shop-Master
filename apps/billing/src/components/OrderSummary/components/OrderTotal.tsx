import { Box, Typography } from "ui";

type OrderTotalProps = {
  total: number;
};

const OrderTotal = ({ total }: OrderTotalProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    }}
  >
    <Typography
      variant="body1"
      sx={{
        fontWeight: 600,
        color: "text.primary",
      }}
    >
      Total Amount
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: "success.main",
      }}
    >
      ₹{total}
    </Typography>
  </Box>
);

export default OrderTotal;
