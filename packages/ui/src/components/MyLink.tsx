import { Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  text?: string | null;
  to?: string | null;
  color?: string | null;
}

const MyLink: FC<LinkProps> = ({ text, to, color }) => {
  const theme = useTheme();
  return (
    <Typography variant="body2" className="hover:underline">
      <Link
        to={to ?? "#"}
        target="_blank"
        style={{
          color: color ?? theme.palette.secondary.main,
        }}
      >
        {text ?? "Link Text"}
      </Link>
    </Typography>
  );
};

export default MyLink;
