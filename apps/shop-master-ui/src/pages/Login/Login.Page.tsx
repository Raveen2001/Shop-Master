import { Link, useNavigate } from "react-router-dom";
import {
  LoadingButton,
  TextField,
  Typography,
  useTheme,
  Divider,
  Box,
  Stack,
  IconButton,
  Alert,
  Grid,
} from "ui";

import { Facebook, Google } from "ui/icons";
import ProjectionImage from "ui/assets/projections.svg";

import "./Login.style.scss";
import { Controller, useForm } from "react-hook-form";
import { ILoginData, ILoginResponse } from "./model";
import { useMutation } from "@tanstack/react-query";
import { loginAsOwner } from "../../services/auth";
import { IRequestError } from "schema";

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { control, handleSubmit } = useForm<ILoginData>();
  const { mutate, isError, isLoading, error } = useMutation<
    ILoginResponse,
    IRequestError,
    ILoginData
  >({
    mutationKey: ["login"],
    mutationFn: loginAsOwner,
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });

  return (
    <Grid
      container
      className="LoginPage"
      sx={{
        padding: "16px 0",
      }}
    >
      <Grid
        item
        lg={8}
        md={6}
        sx={{
          display: {
            xs: "none !important",
            md: "flex !important",
          },
        }}
        className="left"
      >
        <Typography variant="h3">Hi, Welcome back</Typography>
        <ProjectionImage />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        className="right"
        sx={{
          padding: {
            xs: "0 16px",
            md: "0 32px",
          },
        }}
      >
        <Typography variant="h4">Sign in to Shop Master</Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "40px", marginTop: "16px" }}
        >
          New user?
          <Link
            to="/register"
            className="register"
            style={{ color: theme.palette.secondary.main }}
          >
            Create an account
          </Link>
        </Typography>
        {isError && (
          <Alert severity="error" variant={"filled"}>
            {error?.response?.data?.error || "Something went wrong"}
          </Alert>
        )}

        <form
          onSubmit={handleSubmit((data) => {
            mutate(data);
          })}
          className="form"
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email address is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ marginTop: "16px" }}
                label="Email address"
                error={!!error}
                helperText={error?.message}
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                sx={{ marginTop: "16px" }}
                label="Password"
                type="password"
                error={!!error}
                helperText={error?.message}
                fullWidth
                {...field}
              />
            )}
          />

          <Typography
            variant="body2"
            sx={{ textAlign: "right", padding: "16px 0" }}
          >
            <Link
              to="forgot-password"
              style={{
                color: theme.palette.text.primary,
              }}
            >
              Forgot password?
            </Link>
          </Typography>

          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Login
          </LoadingButton>
        </form>
        <Box
          sx={{
            margin: "20px 0",
            fontSize: "10px",
            fontWeight: "600",
            color: theme.palette.grey["600"],
          }}
        >
          <Divider>OR</Divider>
        </Box>
        <Stack direction="row" justifyContent="center">
          <IconButton>
            <Google />
          </IconButton>
          <IconButton>
            <Facebook />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
