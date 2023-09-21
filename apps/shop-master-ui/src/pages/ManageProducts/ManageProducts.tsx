import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";

import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const navigate = useNavigate();
  const products = useGlobalStore((state) => state.products);
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Products</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/products/create")}
        >
          New Product
        </Button>
      </Box>
      <PaginatedTable
        columns={columnsDefs}
        data={products}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageProducts;
