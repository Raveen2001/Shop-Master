import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { ProductCard, Breadcrumb } from "ui";
import { TProductData, TCategoryData } from "schema";

interface ProductsViewProps {
  products: TProductData[];
  selectedCategory: TCategoryData;
  onProductSelect: (product: TProductData) => void;
  onBack: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  selectedCategory,
  onProductSelect,
  onBack,
}) => {
  const filteredProducts = products.filter(
    (product) => product.categoryId === selectedCategory.id
  );

  return (
    <Box>
      <Breadcrumb
        items={[
          { label: "Categories", onClick: onBack },
          { label: selectedCategory.tamilName || selectedCategory.name },
        ]}
        onBack={onBack}
        showBackButton={true}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          marginBottom: "24px",
          color: "text.primary",
        }}
      >
        Products
      </Typography>

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              onClick={onProductSelect}
              variants={product.variants || []}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
