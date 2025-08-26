import { Box, Button, PaginatedTable, Typography, Dialog } from "ui";

import { createColumnsDefs } from "./columns";
import { Add } from "ui/icons";
import { useGlobalStore } from "../../store/globalStore";

import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { mergeProductData } from "../../utils/product";
import { TProductData } from "schema";
import ProductForm from "../../components/ProductForm";
import ProductVariantList from "./ProductVariantTable/ProductVariantTable";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, categories] = useGlobalStore((state) => [
    state.products,
    state.categories,
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<TProductData | null>(null);

  const updatedProducts = useMemo(
    () => mergeProductData(products, categories),
    [categories, products]
  );

  const handleProductEdit = (product: TProductData) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

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
        className="max-h-[80vh]"
        columns={createColumnsDefs(handleProductEdit)}
        data={updatedProducts}
        defaultSortColumn={{ id: "createdAt", desc: false }}
        // getRowCanExpand={(row) => (row.original.variants ?? []).length > 0}
        // renderSubComponent={ProductVariantList}
      />

      {/* Edit Product Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={closeEditModal}
        maxWidth="lg"
        fullWidth
      >
        <ProductForm
          onSuccess={closeEditModal}
          product={productToEdit || undefined}
          categoryId={productToEdit?.categoryId}
        />
      </Dialog>
    </>
  );
};

export default ManageProducts;
