import { Box, Breadcrumbs, Button, Table, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getEmployeeByShopId } from "../../services/employee";

const shopId = "32378637-01ba-4b02-90b7-38214d8aaeca";

const ManageEmployee = () => {
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Employees</Typography>
          <Breadcrumbs></Breadcrumbs>
        </Box>

        <Button
          variant="contained"
          color="contrast"
          size="small"
          startIcon={<Add />}
        >
          New Employee
        </Button>
      </Box>
      <Table
        columns={columnsDefs}
        queryFn={getEmployeeByShopId(shopId)}
        queryKeys={["employee", "shop", shopId]}
      />
    </Box>
  );
};

export default ManageEmployee;
