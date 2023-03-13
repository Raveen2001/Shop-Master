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
  styled,
  TextFieldProps,
} from "ui";

import { Facebook, Google } from "ui/icons";
import ProjectionImage from "ui/assets/projections.svg";

import "./Login.style.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Grid container className="LoginPage" sx={{ padding: "32px" }}>
      <Grid item xs={8} className="left">
        <Typography variant="h3">Hi, Welcome back</Typography>
        <ProjectionImage />
      </Grid>
      <Grid item xs={4} className="right">
        <Typography variant="h4">Sign in to Shop Master</Typography>
        <Typography
          variant="body2"
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

        <TextField label="Email address" color="contrast" type="email" />

        <PasswordField sx={{ marginTop: "16px" }} color="contrast" />

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
          Login
        </Button>

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
