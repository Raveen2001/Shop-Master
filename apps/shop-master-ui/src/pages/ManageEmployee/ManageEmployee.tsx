import { Box, Breadcrumbs, Button, Table, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getEmployeeByShopId } from "../../services/employee";
import { useGlobalStore } from "../../store/globalStore";

const ManageEmployee = () => {
  const selectedShopId = useGlobalStore((state) => state.selectedShopId) ?? "";
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Employees</Typography>
          <Breadcrumbs></Breadcrumbs>
        </Box>

        <Button variant="contained" size="small" startIcon={<Add />}>
          New Employee
        </Button>
      </Box>
      <Table
        columns={columnsDefs}
        queryFn={getEmployeeByShopId(selectedShopId)}
        queryKeys={["employee", "shop", selectedShopId]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageEmployee;
