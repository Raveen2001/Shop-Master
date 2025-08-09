import { IconButton, Box, Typography } from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

interface QuantitySelectorProps {
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
}

const QuantitySelector = ({
  quantity,
  onUpdateQuantity,
}: QuantitySelectorProps) => {
  return (
    <Box>
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
          onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
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
          {quantity}
        </Typography>

        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(quantity + 1)}
          sx={{
            padding: "4px",
            borderRadius: 0,
            borderLeft: "1px solid #e0e0e0",
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default QuantitySelector;
