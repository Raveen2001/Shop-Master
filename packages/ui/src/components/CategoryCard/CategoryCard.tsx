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
      className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg overflow-hidden"
      onClick={() => onClick(category)}
    >
      <Box
        className="relative h-full min-h-[200px] flex items-end"
        sx={{
          backgroundImage: category.image
            ? `url(${VITE_IMAGE_BASE_URL}${category.image})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient overlay for better text visibility */}
        <Box className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Fallback background when no image */}
        {!category.image && (
          <Box className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Typography
              variant="h1"
              color="white"
              className="text-3xl font-bold"
            >
              {category.tamilName || category.name}
            </Typography>
          </Box>
        )}

        {/* Text content */}
        <Box className="relative p-4 w-full z-10">
          <Typography
            variant="h6"
            className="font-bold text-white mb-1 drop-shadow-lg"
          >
            {category.tamilName || category.name}
          </Typography>
          <Typography variant="body2" className="text-white/90 drop-shadow-md">
            Click to view sub-categories
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
