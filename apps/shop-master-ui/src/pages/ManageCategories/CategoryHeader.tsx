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
    <Box className="mb-8">
      {/* Header */}
      <Box className="mb-4 flex items-center justify-between">
        <Box className="flex items-center gap-4">
          {currentCategoryId && (
            <IconButton onClick={onBack}>
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6">
            {currentCategoryId ? "Sub Categories" : "Categories"}
          </Typography>
        </Box>

        <Box className="flex gap-2">
          {currentCategoryId && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={onCreateProduct}
            >
              Create Product
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={onCreateCategory}
          >
            Create Category
          </Button>
        </Box>
      </Box>

      {/* Breadcrumbs */}
      {breadcrumbPath.length > 0 && (
        <Breadcrumbs className="mb-4">
          <Link
            component="button"
            variant="body1"
            onClick={() => onBreadcrumbClick(-1)}
            className="cursor-pointer"
          >
            Categories
          </Link>
          {breadcrumbPath.map((item, index) => (
            <Link
              key={item.id}
              component="button"
              variant="body1"
              onClick={() => onBreadcrumbClick(index)}
              className="cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>
      )}
    </Box>
  );
};

export default CategoryHeader;
