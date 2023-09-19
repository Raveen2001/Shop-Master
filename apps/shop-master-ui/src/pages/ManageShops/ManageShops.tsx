import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";
import { useNavigate } from "react-router-dom";

const ManageShops = () => {
  const shops = useGlobalStore((state) => state.shops);
  const navigate = useNavigate();
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Shops</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/shops/create")}
        >
          New Shop
        </Button>
      </Box>
      <PaginatedTable
        columns={columnsDefs}
        data={shops}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageShops;
