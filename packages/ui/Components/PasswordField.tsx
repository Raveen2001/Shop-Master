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
  error?: boolean;
  errorMsg?: string;
  sx?: SxProps;
  className?: string;
}

const PasswordField: FC<IPasswordFieldProps> = ({
  error,
  errorMsg,
  sx,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" sx={sx} className={className}>
      <InputLabel htmlFor="password" error={error}>
        Password
      </InputLabel>
      <OutlinedInput
        id="password"
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
        label="Password"
        error={error}
      />
      <FormHelperText error={error}>{errorMsg}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
