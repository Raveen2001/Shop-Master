import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Layout from "./layouts/Layout";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import ManageEmployee from "./pages/ManageEmployees/ManageEmployee";
import EmployeeForm from "./pages/EmployeeForm/EmployeeForm";

import EmployeesPaymentHistory from "./pages/EmployeesPaymentHistory";
import EmployeePaymentForm from "./pages/EmployeePaymentForm";

import ManageShops from "./pages/ManageShops";
import ShopForm from "./pages/ShopForm";

import ManageCustomers from "./pages/ManageCustomers/ManageCustomers";
import CustomersPaymentHistory from "./pages/CustomersPaymentHistory ";
import CustomerForm from "./pages/CustomerForm/CustomerForm";

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
            path: "create",
            element: <CustomerForm />,
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
