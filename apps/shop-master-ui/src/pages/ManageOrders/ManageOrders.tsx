import {
  Box,
  Breadcrumbs,
  Button,
  ReactQueryPaginatedTable,
  Typography,
} from "ui";

import { useNavigate } from "react-router-dom";
import { Add } from "ui/icons";
import { getPagedOrdersBy } from "../../services/order";
import { useGlobalStore } from "../../store/globalStore";
import { columnsDefs } from "./columns";

const ManageOrders = () => {
  const selectedShopId = useGlobalStore((state) => state.selectedShopId) ?? "";
  const navigate = useNavigate();
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Orders</Typography>
          <Breadcrumbs></Breadcrumbs>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/orders/create")}
        >
          New Order
        </Button>
      </Box>
      <ReactQueryPaginatedTable
        columns={columnsDefs}
        queryFn={getPagedOrdersBy("shop", selectedShopId)}
        queryKeys={["shop", selectedShopId, "orders"]}
        defaultSortColumn={{ id: "createdAt", desc: true }}
        enabled={!!selectedShopId}
      />
    </Box>
  );
};

export default ManageOrders;
