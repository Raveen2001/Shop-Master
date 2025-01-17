import { Box, Typography, Button, ReactQueryPaginatedTable } from "ui";
import { Add } from "ui/icons";
import { getEmployeePaymentsBy } from "../../services/employee-payments";
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
          <Typography variant="h6">Manage Employee Payments</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("create")}
        >
          New Employee Payment
        </Button>
      </Box>
      <ReactQueryPaginatedTable
        columns={columnsDefs}
        queryFn={getEmployeePaymentsBy("shop", selectedShopId)}
        queryKeys={["shop", selectedShopId, "employees", "payments"]}
        defaultSortColumn={{ id: "createdAt", desc: true }}
      />
    </Box>
  );
};

export default CustomersPaymentHistory;
