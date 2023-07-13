import { Box, Button, Table, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getShopsByOwnerId } from "../../services/shop";
import { useGlobalStore } from "../../store/globalStore";

const ManageShops = () => {
  const ownerId = useGlobalStore((state) => state.owner?.id ?? "");
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Shops</Typography>
        </Box>

        <Button variant="contained" size="small" startIcon={<Add />}>
          New Shop
        </Button>
      </Box>
      <Table
        columns={columnsDefs}
        queryFn={getShopsByOwnerId(ownerId)}
        queryKeys={["shop", "owner", ownerId]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageShops;
