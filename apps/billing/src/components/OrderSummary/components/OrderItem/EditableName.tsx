import { useState } from "react";
import { Box, Typography, TextField } from "ui";
import { Edit as EditIcon } from "@mui/icons-material";
import { useBillingStore } from "../../../../store/billingStore";

type EditableNameProps = {
  name: string;
  productVariantId: string;
};

const EditableName = ({ name, productVariantId }: EditableNameProps) => {
  const { updateOrderItemName } = useBillingStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleNameEdit = () => {
    setTempName(name);
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      updateOrderItemName(productVariantId, tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName("");
    setIsEditingName(false);
  };

  if (isEditingName) {
    return (
      <TextField
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onBlur={handleNameSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleNameSave();
          if (e.key === "Escape") handleNameCancel();
        }}
        autoFocus
        size="small"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "18px",
            fontWeight: 500,
            padding: "4px 8px",
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
      onClick={handleNameEdit}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: "text.primary",
          fontSize: "18px",
          marginBottom: "2px",
        }}
      >
        {name}
      </Typography>
      <EditIcon
        sx={{
          fontSize: "14px",
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

export default EditableName;
