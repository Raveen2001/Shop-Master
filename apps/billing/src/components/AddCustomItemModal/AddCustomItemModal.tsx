import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export type CustomItemFormData = {
  quantity: number;
  unitPrice: number;
};

type CustomItemFormErrors = {
  quantity?: string;
  unitPrice?: string;
};

type AddCustomItemModalProps = {
  open: boolean;
  onClose: () => void;
  onAddItem: (item: CustomItemFormData) => void;
};

export const AddCustomItemModal: React.FC<AddCustomItemModalProps> = ({
  open,
  onClose,
  onAddItem,
}) => {
  const [formData, setFormData] = useState<CustomItemFormData>({
    quantity: 1,
    unitPrice: 1,
  });

  const [errors, setErrors] = useState<Partial<CustomItemFormErrors>>({});

  const handleChange =
    (field: keyof CustomItemFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur =
    (field: keyof CustomItemFormData) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);

      if (isNaN(value)) {
        setErrors((prev) => ({ ...prev, [field]: "Invalid number" }));
        return;
      }

      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomItemFormErrors> = {};

    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = "Unit price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddItem(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      quantity: 1,
      unitPrice: 1,
    });
    setErrors({});
    onClose();
  };

  const totalPrice = formData.quantity * formData.unitPrice;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "8px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "16px",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Add Custom Item
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "0 !important" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange("quantity")}
            onBlur={handleBlur("quantity")}
            error={!!errors.quantity}
            helperText={errors.quantity}
            fullWidth
            variant="outlined"
            inputProps={{ min: 1, step: 1 }}
          />

          <TextField
            label="Unit Price (₹)"
            type="number"
            value={formData.unitPrice}
            onChange={handleChange("unitPrice")}
            onBlur={handleBlur("unitPrice")}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice}
            fullWidth
            variant="outlined"
            inputProps={{ min: 0, step: 0.01 }}
          />

          {formData.quantity > 0 && formData.unitPrice > 0 && (
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Total Price:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "success.main" }}
              >
                ₹{totalPrice.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "20px 24px" }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#2196f3",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};
