import { Button } from "ui";
type PrintBillButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
};

const PrintBillButton = ({
  disabled,
  isLoading,
  onClick,
}: PrintBillButtonProps) => (
  <Button
    variant="contained"
    fullWidth
    size="large"
    onClick={onClick}
    disabled={disabled}
    sx={{
      backgroundColor: "#2196f3",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
      padding: "12px",
      fontSize: "16px",
      fontWeight: 600,
      borderRadius: "8px",
      minHeight: "48px",
    }}
  >
    {isLoading ? "Creating Order..." : "Print Bill"}
  </Button>
);

export default PrintBillButton;
