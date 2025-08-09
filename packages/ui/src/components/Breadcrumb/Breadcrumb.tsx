import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBack?: () => void;
  showBackButton?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onBack,
  showBackButton = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        padding: "12px 0",
      }}
    >
      {showBackButton && onBack && (
        <IconButton
          onClick={onBack}
          sx={{
            marginRight: "12px",
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: "0 8px" }}
              >
                &gt;
              </Typography>
            )}
            <Typography
              variant="body2"
              onClick={item.onClick}
              sx={{
                color: item.onClick ? "primary.main" : "text.primary",
                cursor: item.onClick ? "pointer" : "default",
                fontWeight: index === items.length - 1 ? 600 : 400,
                "&:hover": item.onClick
                  ? {
                      textDecoration: "underline",
                    }
                  : {},
              }}
            >
              {item.label}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};
