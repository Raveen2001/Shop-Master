import { Box, Typography, Button, ReactQueryPaginatedTable } from "ui";
import { Add } from "ui/icons";
import { getCustomerPaymentsBy } from "../../services/customer-payments";
import { columnsDefs } from "./columns";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../store/globalStore";

const CustomersPaymentHistory = () => {
  const navigate = useNavigate();
  const selectedShopId = useGlobalStore((state) => state.selectedShopId) ?? "";
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Customer Payments</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("create")}
        >
          Payment
        </Button>
      </Box>
      <ReactQueryPaginatedTable
        columns={columnsDefs}
        queryFn={getCustomerPaymentsBy("shop", selectedShopId)}
        queryKeys={["shop", selectedShopId, "customers", "payments"]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default CustomersPaymentHistory;
