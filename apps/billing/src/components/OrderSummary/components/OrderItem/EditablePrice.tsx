import { useState } from "react";
import { Box, TextField, Typography } from "ui";
import { Edit as EditIcon } from "@mui/icons-material";
import { useBillingStore } from "../../../../store/billingStore";

type EditablePriceProps = {
  price: number;
  productVariantId: string;
};

const EditablePrice = ({ price, productVariantId }: EditablePriceProps) => {
  const { updateOrderItemUnitPrice } = useBillingStore();
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState("");

  const handlePriceEdit = () => {
    setTempPrice(price.toString());
    setIsEditingPrice(true);
  };

  const handlePriceSave = () => {
    const price = parseFloat(tempPrice);
    if (!isNaN(price) && price >= 0) {
      updateOrderItemUnitPrice(productVariantId, price);
    }
    setIsEditingPrice(false);
  };
  const handlePriceCancel = () => {
    setTempPrice("");
    setIsEditingPrice(false);
  };

  if (isEditingPrice) {
    return (
      <TextField
        value={tempPrice}
        onChange={(e) => setTempPrice(e.target.value)}
        onBlur={handlePriceSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") handlePriceSave();
          if (e.key === "Escape") handlePriceCancel();
        }}
        autoFocus
        size="small"
        type="number"
        inputProps={{ min: 0, step: 0.01 }}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "16px",
            padding: "2px 6px",
            width: "80px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.04)",
          borderRadius: "4px",
          padding: "2px 4px",
        },
      }}
      onClick={handlePriceEdit}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          fontSize: "16px",
        }}
      >
        ₹{price}
      </Typography>
      <EditIcon
        sx={{
          fontSize: "12px",
          color: "text.secondary",
          opacity: 0.7,
          transition: "opacity 0.2s ease-in-out",
          "&:hover": {
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};

export default EditablePrice;
