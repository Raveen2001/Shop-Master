import React from "react";
import { Box, Typography, Card, Grid, LinearProgress } from "ui";
import { useCategoryContext } from "./CategoryContext";
import { useGlobalStore } from "../../store/globalStore";
import { mergeProductData } from "../../utils/product";

interface ProductGridProps {
  onProductClick?: (product: { id: string; name: string }) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const { currentCategoryId, isLoading, filteredProducts } =
    useCategoryContext();

  if (isLoading) {
    return (
      <Box className="flex h-64 flex-col items-center justify-center gap-4">
        <Typography>Loading products...</Typography>
        <LinearProgress className="w-full" />
      </Box>
    );
  }

  if (!currentCategoryId) {
    return null;
  }

  if (filteredProducts.length === 0) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Typography variant="h6" color="textSecondary">
          No products found in this category
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card
            className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg"
            onClick={() => onProductClick?.(product)}
          >
            <Box className="p-4 text-center">
              <Box className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <Typography variant="h4" color="textSecondary">
                  {product.name.charAt(0).toUpperCase()}
                </Typography>
              </Box>
              <Typography variant="h6" className="font-medium">
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="line-clamp-2"
              >
                {product.description || "No description"}
              </Typography>
              {product.variants && product.variants.length > 0 && (
                <Typography variant="caption" color="textSecondary">
                  {product.variants.length} variant
                  {product.variants.length !== 1 ? "s" : ""}
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
