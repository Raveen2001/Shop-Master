import React from "react";
import { Box, Typography, Chip, Card, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { TProductData, TProductVariantData } from "schema";
import { formatCurrency } from "../../utils/currency";

interface ProductCardProps {
  product: TProductData;
  baseURL: string;
  onClick: (product: TProductData) => void;
  variants: TProductVariantData[];
  onEdit?: (product: TProductData) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  variants,
  baseURL,
  onEdit,
}) => {
  const renderVariantInfo = () => {
    if (!variants || variants.length === 0) {
      return (
        <Typography variant="caption" className="text-white/80 drop-shadow-sm">
          No variants
        </Typography>
      );
    }

    // Show the first variant as a preview
    return (
      <Box className="mt-2">
        <Typography
          variant="caption"
          className="text-white/80 drop-shadow-sm block"
        >
          {variants.length} variants
        </Typography>
        <Box className="mt-1 flex items-center gap-1 flex-wrap">
          {variants.slice(0, 2).map((variant) => (
            <Chip
              key={variant.id}
              label={`${variant.noOfUnits} ${variant.unit} - ${formatCurrency(
                variant.salePrice,
              )}`}
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#000",
                fontWeight: "bold",
                fontSize: "0.7rem",
                height: "20px",
                "& .MuiChip-label": {
                  padding: "0 6px",
                },
              }}
            />
          ))}
          {variants.length > 2 && (
            <Typography
              variant="caption"
              className="text-white/80 drop-shadow-sm"
            >
              +{variants.length - 2} more
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-lg min-w-40 w-full overflow-hidden">
      <Box
        className="relative h-full min-h-[280px] flex flex-col cursor-pointer"
        onClick={() => onClick(product)}
        sx={{
          backgroundImage: product.image
            ? `url(${baseURL}${product.image})`
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
                onEdit(product);
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
        <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Fallback background when no image */}
        {!product.image && (
          <Box className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
            <Typography
              variant="h1"
              color="white"
              className="text-3xl font-bold"
            >
              {product.tamilName || product.name}
            </Typography>
          </Box>
        )}

        {/* Text content */}
        <Box className="relative p-4 w-full z-10 mt-auto">
          <Typography
            variant="h6"
            className="font-bold text-white mb-1 drop-shadow-lg line-clamp-1"
          >
            {product.tamilName || product.name}
          </Typography>

          {renderVariantInfo()}
        </Box>
      </Box>
    </Card>
  );
};
