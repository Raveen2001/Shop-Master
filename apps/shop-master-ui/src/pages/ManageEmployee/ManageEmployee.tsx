import { Box, Breadcrumbs, Button, Table, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";

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
        queryFn={async () => ({
          rows: [
            {
              username: "test",
              email: "test",
              phone: "test",
              address: "test",
              type: "test",
              createdAt: "test",
              image: "test",
              name: "test",
              password: "test",
            },
            {
              username: "test",
              email: "test",
              phone: "test",
              address: "test",
              type: "test",
              createdAt: "test",
              image: "test",
              name: "test",
              password: "test",
            },
            {
              username: "test",
              email: "test",
              phone: "test",
              address: "test",
              type: "test",
              createdAt: "test",
              image: "test",
              name: "test",
              password: "test",
            },
          ],
          pageNumber: 5,
          totalCount: 100,
        })}
      />
    </Box>
  );
};

export default ManageEmployee;
