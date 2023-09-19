import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";

import { useNavigate } from "react-router-dom";

const ManageBrands = () => {
  const navigate = useNavigate();
  const brands = useGlobalStore((state) => state.brands);
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
      <PaginatedTable
        columns={columnsDefs}
        data={brands}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageBrands;
