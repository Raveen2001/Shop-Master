// Order Header Component
import { Box, Typography, IconButton } from "ui";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

type OrderHeaderProps = {
  itemCount: number;
  onAddCustomItem: () => void;
  onClearOrder: () => void;
};

const OrderHeader = ({
  itemCount,
  onAddCustomItem,
  onClearOrder,
}: OrderHeaderProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: "text.primary",
      }}
    >
      Order Summary ({itemCount})
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <IconButton
        onClick={onAddCustomItem}
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
      <IconButton
        onClick={onClearOrder}
        sx={{ color: "error.main" }}
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
);

export default OrderHeader;
