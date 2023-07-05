import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  useTheme,
  PasswordField,
  Button,
  Divider,
  Box,
  Stack,
  IconButton,
  Link as MuiLink,
  Alert,
} from "ui";

import { Facebook, Google } from "ui/icons";
import WellDoneImage from "ui/assets/well_done.svg";

import "./Register.style.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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
            style={{ color: theme.palette.primary.main }}
          >
            Sign in
          </Link>
        </Typography>

        <Alert severity="error" variant={"filled"}>
          No user found with this email address
        </Alert>
        <TextField
          sx={{ marginTop: "16px" }}
          label="Email address"
          color="contrast"
          type="email"
        />

        <PasswordField sx={{ marginTop: "16px" }} color="contrast" />

        <PasswordField
          label="Confirm password"
          sx={{ marginTop: "16px" }}
          color="contrast"
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

        <Button variant="contained" color="contrast">
          Create Account
        </Button>

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
