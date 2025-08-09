import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, ReactTable, Typography, Card, Chip, Dialog } from "ui";
import { Add, ArrowBack } from "ui/icons";
import { getProductById } from "../../services/product";
import { columnsDefs } from "./columns";
import ProductVariantForm from "../ProductVariantForm/ProductVariantForm";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] =
    useState(false);

  const {
    data: productResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: getProductById(id!),
    enabled: !!id,
  });

  const product = productResponse?.data;

  const handleVariantSuccess = () => {
    setIsCreateVariantModalOpen(false);
    // Refetch the product data to show the new variant
    queryClient.invalidateQueries({ queryKey: ["product", id] });
  };

  if (isLoading) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Typography color="error">Product not found</Typography>
      </Box>
    );
  }

  return (
    <Box className="px-8 py-4">
      {/* Header */}
      <Box className="mb-8 flex items-center gap-4">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Box className="flex-1">
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Product Details
          </Typography>
        </Box>
      </Box>

      {/* Product Information */}
      <Card elevation={2} className="mb-8 p-6">
        <Typography variant="h6" className="mb-4">
          Product Information
        </Typography>

        <Box className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Description
            </Typography>
            <Typography variant="body1">
              {product.description || "No description available"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Category
            </Typography>
            <Typography variant="body1">
              {product.category?.name || "No category"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Created At
            </Typography>
            <Typography variant="body1">
              {new Date(product.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Updated At
            </Typography>
            <Typography variant="body1">
              {new Date(product.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Variants Section */}
      <Box className="mb-8">
        <Box className="mb-4 flex items-center justify-between">
          <Typography variant="h6">Product Variants</Typography>

          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={() => setIsCreateVariantModalOpen(true)}
          >
            Add New Variant
          </Button>
        </Box>

        <ReactTable columns={columnsDefs} data={product.variants ?? []} />
      </Box>

      {/* Create Variant Modal */}
      <Dialog
        open={isCreateVariantModalOpen}
        onClose={() => setIsCreateVariantModalOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <ProductVariantForm
          productId={product.id}
          onSuccess={handleVariantSuccess}
        />
      </Dialog>
    </Box>
  );
};

export default ProductDetail;
