import { IconButton, Box, TextField } from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
}

const QuantitySelector = ({
  quantity,
  onUpdateQuantity,
}: QuantitySelectorProps) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Update input value when quantity prop changes
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue >= 1) {
      onUpdateQuantity(numValue);
    } else {
      // Reset to current quantity if invalid input
      setInputValue(quantity.toString());
    }
  };

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

        <TextField
          value={inputValue}
          onChange={handleInputChange}
          variant="standard"
          size="small"
          inputProps={{
            style: {
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 500,
              padding: "4px 8px",
              minWidth: "40px",
            },
            min: 1,
            type: "number",
          }}
          sx={{
            "& .MuiInput-underline:before": { borderBottom: "none" },
            "& .MuiInput-underline:after": { borderBottom: "none" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
            "& .MuiInput-root": {
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
        />

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
