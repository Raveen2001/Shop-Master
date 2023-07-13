import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/Login";
import ManageEmployee from "./pages/ManageEmployee/ManageEmployee";
import RegisterPage from "./pages/Register";
import ManageShops from "./pages/ManageShops/ManageShops";

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
        path: "/employee",
        element: <ManageEmployee />,
      },

      {
        path: "/",
        element: <ManageShops />,
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);
