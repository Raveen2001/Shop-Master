import React from "react";
import { Box, Typography, Grid, Divider, Button } from "@mui/material";
import { CategoryCard, ProductCard, Breadcrumb } from "ui";
import { useGlobalStore } from "../../store";
import { useBillingStore } from "../../store/billingStore";

export const CategoryDetailsView: React.FC = () => {
  // Get subcategories of the current category

  const store = useGlobalStore();
  const {
    categoryPath,
    goBack,
    goToHome,
    navigateToCategoryInPath,
    selectProduct,
    selectCategory,
    selectedCategory,
  } = useBillingStore();

  const subCategories = store.categories.filter(
    (cat) => cat.parentId === selectedCategory?.id
  );

  // Get products that belong to the current category
  const categoryProducts = store.products.filter(
    (product) => product.categoryId === selectedCategory?.id
  );

  // Build breadcrumb items from the path
  const breadcrumbItems = [
    { label: "Categories", onClick: () => goBack() },
    ...categoryPath.map((cat, index) => ({
      label: cat.tamilName || cat.name,
      onClick: () => {
        // Navigate to specific category in path
        navigateToCategoryInPath(index);
      },
    })),
  ];

  return (
    <Box>
      <Box className="flex justify-between">
        <Breadcrumb
          items={breadcrumbItems}
          onBack={goBack}
          showBackButton={true}
        />

        <Box className="flex justify-end">
          <Button
            variant="outlined"
            color="primary"
            style={{
              height: "20px",
            }}
            onClick={() => goToHome()}
          >
            Home
          </Button>
        </Box>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          marginBottom: "24px",
          color: "text.primary",
        }}
      >
        {selectedCategory?.tamilName || selectedCategory?.name}
      </Typography>

      {/* Subcategories Section */}
      {subCategories.length > 0 && (
        <Box sx={{ marginBottom: "32px" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              marginBottom: "16px",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Subcategories
            <Typography
              component="span"
              sx={{
                fontSize: "0.875rem",
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              ({subCategories.length})
            </Typography>
          </Typography>
          <Grid container spacing={2}>
            {subCategories.map((subCategory) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={subCategory.id}
                sx={{ height: "max-content" }}
              >
                <CategoryCard category={subCategory} onClick={selectCategory} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Products Section */}
      {categoryProducts.length > 0 && (
        <Box>
          {subCategories.length > 0 && (
            <Divider sx={{ marginBottom: "24px" }} />
          )}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              marginBottom: "16px",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Products
            <Typography
              component="span"
              sx={{
                fontSize: "0.875rem",
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              ({categoryProducts.length})
            </Typography>
          </Typography>
          <Grid container spacing={2}>
            {categoryProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard
                  product={product}
                  onClick={selectProduct}
                  variants={store.productVariants.filter(
                    (v) => v.productId === product.id
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* No Content State */}
      {subCategories.length === 0 && categoryProducts.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            padding: "40px 20px",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            No Content Available
          </Typography>
          <Typography variant="body2">
            This category has no subcategories or products yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
