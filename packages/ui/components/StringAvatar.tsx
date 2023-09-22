import { Avatar } from "@mui/material";
import React from "react";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

interface IAvatarWithFallbackProps {
  fallbackName: string;
  src?: string | null;
  fontSize?: string;
}

const AvatarWithFallback: React.FC<IAvatarWithFallbackProps> = ({
  src,
  fallbackName,
  fontSize,
}) => {
  return (
    <Avatar
      sx={{
        bgcolor: stringToColor(fallbackName),
        fontSize,
      }}
      src={src ?? undefined}
    >
      {fallbackName
        .split(" ")
        .slice(0, 2)
        .map((name) => name[0])
        .join("")}
    </Avatar>
  );
};

export default AvatarWithFallback;
