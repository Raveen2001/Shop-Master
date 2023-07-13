import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/Login";
import ManageEmployee from "./pages/Employee/ManageEmployee";
import RegisterPage from "./pages/Register";
import ManageShops from "./pages/ManageShops/ManageShops";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import Layout from "./layouts/Layout";

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
        path: "employees",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <ManageEmployee />,
          },
          {
            path: "create",
            element: <EmployeeForm />,
          },
        ],
      },
      {
        path: "shops",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <ManageShops />,
          },
        ],
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);
