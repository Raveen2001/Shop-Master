import React from "react";
import { Box, Typography, Grid, Divider, Button } from "@mui/material";
import { Breadcrumb } from "ui";
import { ProductVariantCard } from "../ProductVariantCard";
import { useBillingStore } from "../../store/billingStore";
import { useGlobalStore } from "../../store";

export const ProductVariantsView: React.FC = () => {
  const {
    selectedProduct,
    selectedCategory,
    goBack,
    navigateToCategoryInPath,
    goToHome,
  } = useBillingStore();

  const store = useGlobalStore();

  const variants = store.productVariants.filter(
    (variant) => variant.productId === selectedProduct?.id
  );

  return (
    <Box>
      <Box className="flex justify-between">
        <Breadcrumb
          items={[
            {
              label: "Categories",
              onClick: () => navigateToCategoryInPath(-1),
            },
            {
              label:
                selectedCategory?.tamilName ||
                selectedCategory?.name ||
                "Unknown Category",
              onClick: () => goBack(),
            },
            {
              label: selectedProduct?.tamilName || selectedProduct?.name || "",
            },
          ]}
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
      {/* Product Details Section */}
      <Box>
        <Typography variant="h6">
          {selectedProduct?.tamilName || selectedProduct?.name}
        </Typography>

        {selectedProduct?.description && (
          <Typography variant="body1">
            {selectedProduct?.description}
          </Typography>
        )}

        <Divider sx={{ marginBottom: "16px" }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            marginBottom: "16px",
            color: "text.primary",
          }}
        >
          Available Variants
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginBottom: "16px",
          }}
        >
          Select a variant to add to your bill
        </Typography>
      </Box>

      {/* Variants Grid */}
      <Grid container spacing={2}>
        {variants.map((variant) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={variant.id}>
            <ProductVariantCard variant={variant} />
          </Grid>
        ))}
      </Grid>

      {variants.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            padding: "40px",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            No Variants Available
          </Typography>
          <Typography variant="body2">
            This product doesn&apos;t have any variants configured for billing.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
