import { Box, Button, ReactTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";
import { useNavigate } from "react-router-dom";

const ManageCustomers = () => {
  const navigate = useNavigate();
  const customers = useGlobalStore((state) => state.customers);
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Customers</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/customers/create")}
        >
          New Customer
        </Button>
      </Box>

      <ReactTable columns={columnsDefs} data={customers} />
    </Box>
  );
};

export default ManageCustomers;
