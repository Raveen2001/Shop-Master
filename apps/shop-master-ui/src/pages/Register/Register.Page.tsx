import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Divider,
  Grid,
  IconButton,
  LoadingButton,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "ui";
import WellDoneImage from "ui/assets/well_done.svg";
import { Facebook, Google } from "ui/icons";
import { IRequestError } from "schema";
import { registerAsOwner } from "../../services/auth";
import { IRegisterData } from "./model";
import "./Register.style.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { control, handleSubmit } = useForm<IRegisterData>();
  const { mutate, isPending, isError, error } = useMutation<
    unknown,
    IRequestError,
    IRegisterData
  >({
    mutationFn: registerAsOwner,
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <Grid
      container
      className="RegisterPage"
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
        <Typography variant="h3" textAlign="center">
          Manage the job more effectively
          <br />
          with Shop Master
        </Typography>
        <WellDoneImage />
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
        <Typography variant="h4">Get started with Shop Master</Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "40px", marginTop: "16px" }}
        >
          Already have an account?
          <Link
            to="/login"
            className="login"
            style={{ color: theme.palette.secondary.main }}
          >
            Sign in
          </Link>
        </Typography>
        {isError && (
          <Alert severity="error" variant={"filled"}>
            {error?.response?.data?.error ||
              "Something went wrong, Try again later."}
          </Alert>
        )}

        <form className="form" onSubmit={handleSubmit((data) => mutate(data))}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Name"
                type="text"
                sx={{ marginTop: "16px" }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Phone is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Must be a valid phone number",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                sx={{ marginTop: "16px" }}
                label="Phone"
                type="tel"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Must be a valid email",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                sx={{ marginTop: "16px" }}
                label="Email address"
                type="text"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                sx={{ marginTop: "16px" }}
                label="Password"
                type="password"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Typography
            variant="body2"
            sx={{ textAlign: "right", padding: "16px 0" }}
          >
            <Link
              to="forgot-password"
              className="forgot-password"
              style={{
                color: theme.palette.text.primary,
              }}
            >
              Forgot password?
            </Link>
          </Typography>

          <LoadingButton type="submit" variant="contained" loading={isPending}>
            Create Account
          </LoadingButton>
        </form>

        <Typography
          variant="caption"
          sx={{
            marginTop: "20px",
            marginLeft: "5px",
            color: theme.palette.grey["600"],
          }}
        >
          By signing up, I agree to <MuiLink>Terms of Service</MuiLink> and{" "}
          <MuiLink>Privacy Policy</MuiLink>
        </Typography>
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

export default RegisterPage;
