import { Box, Typography, Button } from "ui";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

type FloatingActionButtonProps = {
  itemCount: number;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
};

// Floating Action Button Component
const FloatingActionButton = ({
  itemCount,
  total,
  isOpen,
  onToggle,
}: FloatingActionButtonProps) => (
  <Box
    sx={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1200,
    }}
  >
    <Button
      variant="contained"
      onClick={onToggle}
      startIcon={isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
      sx={{
        borderRadius: "50px",
        padding: "12px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        backgroundColor: "#2196f3",
        "&:hover": {
          backgroundColor: "#1976d2",
        },
        minWidth: "140px",
      }}
    >
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body2" sx={{ fontSize: "0.75rem", lineHeight: 1 }}>
          {isOpen ? "Hide" : `${itemCount} items`}
        </Typography>
        {!isOpen && (
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            ₹{total}
          </Typography>
        )}
      </Box>
    </Button>
  </Box>
);

export default FloatingActionButton;
