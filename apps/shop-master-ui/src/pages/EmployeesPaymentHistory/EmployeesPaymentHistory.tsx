import { Box, Typography, Breadcrumbs, Button, PaginatedTable } from "ui";
import { Add } from "ui/icons";
import { getEmployeePaymentsBy } from "../../services/employee-payments";
import { columnsDefs } from "./columns";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../store/globalStore";

const EmployeesPaymentHistory = () => {
  const navigate = useNavigate();
  const selectedShopId = useGlobalStore((state) => state.selectedShopId) ?? "";
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Employees</Typography>
          <Breadcrumbs></Breadcrumbs>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/employee-payment/create")}
        >
          New Employee
        </Button>
      </Box>
      <PaginatedTable
        columns={columnsDefs}
        queryFn={getEmployeePaymentsBy("shop", selectedShopId)}
        queryKeys={["employees", "shop", selectedShopId]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default EmployeesPaymentHistory;
