import React from "react";
import { Box, Typography, Grid, LinearProgress, ProductCard } from "ui";
import { useCategoryContext } from "./CategoryContext";
import { useGlobalStore } from "../../store/globalStore";
import { useNavigate } from "react-router-dom";
import { TProductData } from "schema";
import { getImageBaseUrl } from "../../utils/configStorage";

interface ProductGridProps {
  onProductEdit?: (product: TProductData) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductEdit }) => {
  const { filteredProducts } = useCategoryContext();
  const navigate = useNavigate();

  const isProductDataFetching = useGlobalStore(
    (state) => state.isProductDataFetching
  );

  if (isProductDataFetching) {
    return (
      <Box className="flex h-64 flex-col items-center justify-center gap-4">
        <Typography>Loading products...</Typography>
        <LinearProgress className="w-full" />
      </Box>
    );
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
          <ProductCard
            baseURL={getImageBaseUrl()}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
            variants={product.variants || []}
            onEdit={onProductEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
