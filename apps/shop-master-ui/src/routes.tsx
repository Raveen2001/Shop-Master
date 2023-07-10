import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/Login";
import ManageEmployee from "./pages/ManageEmployee/ManageEmployee";
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
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        path: "/",
        element: <ManageEmployee />,
      },

      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);
