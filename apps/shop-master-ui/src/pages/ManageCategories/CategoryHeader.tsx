import React from "react";
import { Box, Button, Typography, IconButton, Breadcrumbs, Link } from "ui";
import { Add, ArrowBack } from "ui/icons";
import { useCategoryContext } from "./CategoryContext";

interface CategoryHeaderProps {
  onBack: () => void;
  onCreateCategory: () => void;
  onCreateProduct: () => void;
  onBreadcrumbClick: (index: number) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  onBack,
  onCreateCategory,
  onCreateProduct,
  onBreadcrumbClick,
}) => {
  const { currentCategoryId, breadcrumbPath } = useCategoryContext();

  return (
    <Box className="mb-6 md:mb-8">
      {/* Header */}
      <Box className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Box className="flex items-center gap-2 md:gap-4">
          {currentCategoryId && (
            <IconButton onClick={onBack} className="p-1 md:p-2">
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6" className="text-lg md:text-xl">
            {currentCategoryId ? "Sub Categories" : "Categories"}
          </Typography>
        </Box>

        <Box className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          {currentCategoryId && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={onCreateProduct}
              className="w-full text-xs sm:w-auto sm:text-sm"
            >
              <span className="hidden sm:inline">Create Product</span>
              <span className="sm:hidden">Product</span>
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={onCreateCategory}
            className="w-full text-xs sm:w-auto sm:text-sm"
          >
            <span className="hidden sm:inline">Create Category</span>
            <span className="sm:hidden">Category</span>
          </Button>
        </Box>
      </Box>

      {/* Breadcrumbs */}
      {breadcrumbPath.length > 0 && (
        <Box className="mb-4 overflow-x-auto">
          <Breadcrumbs className="whitespace-nowrap">
            <Link
              component="button"
              variant="body1"
              onClick={() => onBreadcrumbClick(-1)}
              className="cursor-pointer text-sm md:text-base"
            >
              Categories
            </Link>
            {breadcrumbPath.map((item, index) => (
              <Link
                key={item.id}
                component="button"
                variant="body1"
                onClick={() => onBreadcrumbClick(index)}
                className="cursor-pointer text-sm md:text-base"
              >
                {item.name}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>
      )}
    </Box>
  );
};

export default CategoryHeader;
