import React from "react";
import { Box, Typography, Card } from "@mui/material";
import { TCategoryData } from "schema";

// import env variables from process.env
const { VITE_IMAGE_BASE_URL } = import.meta.env;

interface CategoryCardProps {
  category: TCategoryData;
  onClick: (category: TCategoryData) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
}) => {
  return (
    <Card
      className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg"
      onClick={() => onClick(category)}
    >
      <Box className="p-4 text-center">
        <Box className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          {category.image ? (
            <img
              src={`${VITE_IMAGE_BASE_URL}${category.image}`}
              alt={category.tamilName || category.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Typography variant="h4" color="textSecondary">
              {(category.tamilName || category.name).charAt(0).toUpperCase()}
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
  );
};
