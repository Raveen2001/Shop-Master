import React from "react";
import { Box, Typography, Chip, Card } from "@mui/material";
import { TProductData, TProductVariantData } from "schema";
import { formatCurrency } from "../../utils/currency";

interface ProductCardProps {
  product: TProductData;
  onClick: (product: TProductData) => void;
  variants: TProductVariantData[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  variants,
}) => {
  const renderVariantInfo = () => {
    if (!variants || variants.length === 0) {
      return (
        <Typography variant="caption" color="textSecondary">
          No variants
        </Typography>
      );
    }

    // Show the first variant as a preview
    return (
      <Box className="mt-2">
        <Typography variant="caption" color="textSecondary" className="block">
          {variants.length} variants
        </Typography>
        <Box className="mt-1 flex items-center gap-2 flex-wrap justify-center">
          {variants.map((variant) => (
            <Chip
              key={variant.id}
              label={`${variant.noOfUnits} ${variant.unit} - ${formatCurrency(
                variant.salePrice,
              )}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    );
  };
  return (
    <Card
      className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg min-w-40 w-full"
      onClick={() => onClick(product)}
    >
      <Box className="p-4 text-center">
        <Box className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          <Typography variant="h4" color="textSecondary">
            {product.name.charAt(0).toUpperCase()}
          </Typography>
        </Box>
        <Typography variant="h6" className="font-medium">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="line-clamp-2"
        >
          {product.description || "No description"}
        </Typography>
        {renderVariantInfo()}
      </Box>
    </Card>
  );
};
