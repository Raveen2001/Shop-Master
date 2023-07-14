import { Box, Breadcrumbs, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getEmployeeByShopId } from "../../services/employee";
import { useGlobalStore } from "../../store/globalStore";
import { useNavigate } from "react-router-dom";

const ManageEmployee = () => {
  const selectedShopId = useGlobalStore((state) => state.selectedShopId) ?? "";
  const navigate = useNavigate();
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
          onClick={() => navigate("/employees/create")}
        >
          New Employee
        </Button>
      </Box>
      <PaginatedTable
        columns={columnsDefs}
        queryFn={getEmployeeByShopId(selectedShopId)}
        queryKeys={["employees", "shop", selectedShopId]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageEmployee;
