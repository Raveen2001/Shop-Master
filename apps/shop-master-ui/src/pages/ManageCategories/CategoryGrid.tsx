import React from "react";
import { Box, Typography, Card, Grid, LinearProgress, CategoryCard } from "ui";
import { useCategoryContext } from "./CategoryContext";
import { TCategoryData } from "schema";

interface CategoryGridProps {
  onCategoryClick: (category: { id: string; name: string }) => void;
  onCategoryEdit?: (category: TCategoryData) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategoryClick,
  onCategoryEdit,
}) => {
  const { isLoading, currentCategoryId, filteredCategories } =
    useCategoryContext();

  if (isLoading) {
    return (
      <Box className="flex h-64 flex-col items-center justify-center gap-4">
        <Typography>Loading categories...</Typography>
        <LinearProgress className="w-full" />
      </Box>
    );
  }

  if (filteredCategories.length === 0) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Typography variant="h6" color="textSecondary">
          {currentCategoryId
            ? "No sub-categories found"
            : "No categories found"}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredCategories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
          <CategoryCard
            category={category}
            onClick={onCategoryClick}
            onEdit={onCategoryEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
