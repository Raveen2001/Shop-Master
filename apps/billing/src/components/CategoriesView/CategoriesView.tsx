import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { CategoryCard } from "ui";
import { useGlobalStore } from "../../store";
import { useBillingStore } from "../../store/billingStore";
import FullscreenButton from "../FullscreenButton";

export const CategoriesView: React.FC = () => {
  const store = useGlobalStore();
  const { selectCategory } = useBillingStore();
  // Filter for root categories only (no parentId)
  const rootCategories = store.categories.filter((cat) => !cat.parentId);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            marginBottom: "24px",
            color: "text.primary",
          }}
        >
          Browse Categories
        </Typography>

        <FullscreenButton />
      </Box>

      <Typography
        variant="body1"
        sx={{
          marginBottom: "24px",
          color: "text.secondary",
        }}
      >
        Select a category to view its subcategories and products
      </Typography>

      <Grid container spacing={2} height="100%" overflow="auto">
        {rootCategories.map((category) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={category.id}
            sx={{
              height: "max-content",
            }}
          >
            <CategoryCard category={category} onClick={selectCategory} />
          </Grid>
        ))}
      </Grid>

      {rootCategories.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            padding: "40px 20px",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            No Categories Available
          </Typography>
          <Typography variant="body2">
            There are no categories set up yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
