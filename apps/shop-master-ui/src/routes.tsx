import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
