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
  color?:string;
  className?: string;
}

export const PasswordField: FC<IPasswordFieldProps> = ({
  error,
  label,
  helperText,
  sx,
  color,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" sx={sx} className={className}>
      <InputLabel htmlFor="password" error={error} color={color as any}>
        {label?? "Password"}
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
        label= {label?? "Password"}
        error={error}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};
