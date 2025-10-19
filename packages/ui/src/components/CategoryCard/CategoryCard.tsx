import React from "react";
import { Box, Typography, Card, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { TCategoryData } from "schema";

// import env variables from process.env

interface CategoryCardProps {
  category: TCategoryData;
  baseURL: string;
  onClick: (category: TCategoryData) => void;
  onEdit?: (category: TCategoryData) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  baseURL,
  onClick,
  onEdit,
}) => {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-lg overflow-hidden">
      <Box
        className="relative h-full min-h-[200px] flex items-end cursor-pointer"
        onClick={() => onClick(category)}
        sx={{
          backgroundImage: category.image
            ? `url(${baseURL}${category.image})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Action buttons */}
        {onEdit && (
          <Box className="absolute top-2 right-2 z-20">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(category);
              }}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Box>
        )}

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
