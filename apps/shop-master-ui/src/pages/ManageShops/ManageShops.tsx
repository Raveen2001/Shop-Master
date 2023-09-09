import { Box, Button, ReactQueryPaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getShopsByOwnerId } from "../../services/shop";
import { useGlobalStore } from "../../store/globalStore";
import { useNavigate } from "react-router-dom";

const ManageShops = () => {
  const ownerId = useGlobalStore((state) => state.owner?.id ?? "");
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
      <ReactQueryPaginatedTable
        columns={columnsDefs}
        queryFn={getShopsByOwnerId(ownerId)}
        queryKeys={["owner", ownerId, "shops"]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageShops;
