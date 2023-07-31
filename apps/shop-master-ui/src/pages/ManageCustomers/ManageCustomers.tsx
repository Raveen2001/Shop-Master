import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getShopsByOwnerId } from "../../services/shop";
import { useGlobalStore } from "../../store/globalStore";

const ManageCustomers = () => {
  const shopId = useGlobalStore((state) => state.selectedShop?.id ?? "");
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Customers</Typography>
        </Box>

        <Button variant="contained" size="small" startIcon={<Add />}>
          New Customer
        </Button>
      </Box>
      <PaginatedTable
        columns={columnsDefs}
        queryFn={getShopsByOwnerId(shopId)}
        queryKeys={["shop", "customers", shopId]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageCustomers;
