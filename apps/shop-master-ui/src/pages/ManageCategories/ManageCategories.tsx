import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";

import { useNavigate } from "react-router-dom";

const ManageCategories = () => {
  const navigate = useNavigate();
  const categories = useGlobalStore((state) => state.categories);
  return (
    <Box>
      <Box className="mb-8 flex">
        <Box className="flex-1">
          <Typography variant="h6">Manage Categories</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate("/categories/create")}
        >
          New Category
        </Button>
      </Box>

      <PaginatedTable
        columns={columnsDefs}
        data={categories}
        getSubRows={(row) => row.subCategories ?? []}
        defaultSortColumn={{ id: "createdAt", desc: false }}
      />
    </Box>
  );
};

export default ManageCategories;
