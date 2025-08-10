import React from "react";
import { Box, Typography, Card, Grid, LinearProgress } from "ui";
import { useCategoryContext } from "./CategoryContext";

interface CategoryGridProps {
  onCategoryClick: (category: { id: string; name: string }) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
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
          <Card
            className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg"
            onClick={() => onCategoryClick(category)}
          >
            <Box className="p-4 text-center">
              <Box className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.tamilName || category.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Typography variant="h4" color="textSecondary">
                    {(category.tamilName || category.name)
                      .charAt(0)
                      .toUpperCase()}
                  </Typography>
                )}
              </Box>
              <Typography variant="h6" className="font-medium">
                {category.tamilName || category.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Click to view sub-categories
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
