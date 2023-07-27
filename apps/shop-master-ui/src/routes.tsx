import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/Login";
import ManageEmployee from "./pages/ManageEmployees/ManageEmployee";
import RegisterPage from "./pages/Register";
import ManageShops from "./pages/ManageShops/ManageShops";
import EmployeeForm from "./pages/ManageEmployees/EmployeeForm";
import Layout from "./layouts/Layout";
import EmployeesPaymentHistory from "./pages/EmployeesPaymentHistory";

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
          {
            path: "payment-history",
            element: <EmployeesPaymentHistory />,
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
