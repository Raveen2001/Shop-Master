import {
  Box,
  Breadcrumbs,
  Button,
  ReactQueryPaginatedTable,
  Typography,
} from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { getEmployeeByShopId } from "../../services/employee";
import { useGlobalStore } from "../../store/globalStore";
import { useNavigate } from "react-router-dom";

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
          onClick={() => navigate("/employees/create")}
        >
          New Order
        </Button>
      </Box>
      <ReactQueryPaginatedTable
        columns={columnsDefs}
        queryFn={getEmployeeByShopId(selectedShopId)}
        queryKeys={["shop", selectedShopId, "employees"]}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageOrders;
