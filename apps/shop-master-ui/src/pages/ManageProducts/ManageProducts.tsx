import { Box, Button, PaginatedTable, Typography } from "ui";

import { columnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";

import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { mergeProductData } from "../../utils/product";
import ProductVariantList from "./ProductVariantTable/ProductVariantTable";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, brands, categories] = useGlobalStore((state) => [
    state.products,
    state.brands,
    state.categories,
  ]);

  const updatedProducts = useMemo(
    () => mergeProductData(products, brands, categories),
    [brands, categories, products]
  );

  return (
    <>
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
        className="max-h-[70vh]"
        columns={columnsDefs}
        data={updatedProducts}
        defaultSortColumn={{ id: "createdAt", desc: false }}
        // getRowCanExpand={(row) => (row.original.variants ?? []).length > 0}
        // renderSubComponent={ProductVariantList}
      />
    </>
  );
};

export default ManageProducts;
