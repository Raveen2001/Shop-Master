import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";

import { useNavigate } from "react-router-dom";

const ManageBrands = () => {
  const navigate = useNavigate();
  const brands = useGlobalStore((state) => state.brands);
  return (
    <>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Brands</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/brands/create")}
        >
          New Brand
        </Button>
      </Box>

      <PaginatedTable
        className="h-[80vh]"
        columns={columnsDefs}
        data={brands}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </>
  );
};

export default ManageBrands;
