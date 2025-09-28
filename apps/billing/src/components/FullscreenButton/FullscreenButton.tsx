import React from "react";
import { IconButton, Tooltip } from "ui";
import { useFullscreen } from "../../hooks/useFullscreen";

interface FullscreenButtonProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  className = "",
  size = "medium",
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Tooltip
      title={isFullscreen ? "Exit Fullscreen (F11)" : "Enter Fullscreen (F11)"}
    >
      <IconButton
        onClick={toggleFullscreen}
        className={`fullscreen-button ${className}`}
        size={size}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {isFullscreen ? (
          // Exit fullscreen icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Enter fullscreen icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default FullscreenButton;
