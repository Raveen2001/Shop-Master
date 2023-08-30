import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/Login";
import ManageEmployee from "./pages/ManageEmployees/ManageEmployee";
import RegisterPage from "./pages/Register";
import ManageShops from "./pages/ManageShops/ManageShops";
import EmployeeForm from "./pages/ManageEmployees/EmployeeForm";
import Layout from "./layouts/Layout";
import EmployeesPaymentHistory from "./pages/EmployeesPaymentHistory";
import ManageCustomers from "./pages/ManageCustomers/ManageCustomers";
import ShopForm from "./pages/ManageShops/ShopForm";
import CustomersPaymentHistory from "./pages/CustomersPaymentHistory ";
import EmployeePaymentForm from "./pages/EmployeePaymentForm";

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
            element: <Layout />,

            children: [
              {
                path: "",
                element: <EmployeesPaymentHistory />,
              },
              {
                path: "create",
                element: <EmployeePaymentForm />,
              },
            ],
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
          {
            path: "create",
            element: <ShopForm />,
          },
        ],
      },
      {
        path: "customers",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <ManageCustomers />,
          },
          {
            path: "payment-history",
            element: <CustomersPaymentHistory />,
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
