import { Box, Typography, Button } from "ui";
import { useGlobalStore } from "../../store";

const BillingHeader = () => {
  const { employee, shop } = useGlobalStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        marginBottom: "20px",
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Billing System
        </Typography>
      </Box>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default BillingHeader;
