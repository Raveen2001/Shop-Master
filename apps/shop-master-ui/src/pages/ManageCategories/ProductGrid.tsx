import {
  Box,
  Typography,
  Card,
  Grid,
  LinearProgress,
  Chip,
  Button,
  ProductCard,
} from "ui";
import { useCategoryContext } from "./CategoryContext";
import { useGlobalStore } from "../../store/globalStore";
import { TProductData } from "schema";
import { formatCurrency } from "ui";
import { Visibility } from "ui/icons";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const { filteredProducts } = useCategoryContext();
  const navigate = useNavigate();

  const isProductDataFetching = useGlobalStore(
    (state) => state.isProductDataFetching
  );

  const renderVariantInfo = (product: TProductData) => {
    if (!product.variants || product.variants.length === 0) {
      return (
        <Typography variant="caption" color="textSecondary">
          No variants
        </Typography>
      );
    }

    // Show the first variant as a preview
    return (
      <Box className="mt-2">
        <Typography variant="caption" color="textSecondary" className="block">
          {product.variants.length} variants
        </Typography>
        <Box className="mt-1 flex items-center gap-2">
          {product.variants.map((variant) => (
            <Chip
              key={variant.id}
              label={`${variant.noOfUnits} ${variant.unit} - ${formatCurrency(
                variant.salePrice
              )}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    );
  };

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
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
            variants={product.variants || []}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
