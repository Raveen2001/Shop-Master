import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  SxProps,
} from "@mui/material";
import { FC, useState } from "react";

interface IPasswordFieldProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps;
  color?: string;
  className?: string;
}

export const PasswordField: FC<IPasswordFieldProps> = ({
  label,
  sx,
  color,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" sx={sx} className={className} fullWidth>
      <InputLabel htmlFor="password" color={color as any}>
        {label ?? "Password"}
      </InputLabel>

      <OutlinedInput
        id="password"
        color={color as any}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label ?? "Password"}
      />
      <FormHelperText> true</FormHelperText>
    </FormControl>
  );
};
