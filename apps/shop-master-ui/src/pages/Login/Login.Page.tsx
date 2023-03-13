import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "ui";

import { Visibility, VisibilityOff } from "ui/icons";
import ProjectionImage from "ui/assets/projections.svg";

import "./Login.style.scss";
const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Grid container className="LoginPage" sx={{ padding: "8px" }}>
      <Grid item xs={8} className="left">
        <Typography variant="h3">Hi, Welcome back</Typography>
        <ProjectionImage />
      </Grid>
      <Grid item xs={4} className="right">
        <Typography variant="h4">Sign in to Shop Master</Typography>
        <Typography
          variant="p"
          sx={{ marginBottom: "40px", marginTop: "16px" }}
        >
          New user?
          <Link
            to="register"
            className="register"
            style={{ color: theme.palette.primary.main }}
          >
            Create an account
          </Link>
        </Typography>

        <TextField
          error
          label="Email address"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
