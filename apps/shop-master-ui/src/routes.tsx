import { createBrowserRouter } from "react-router-dom";

import AuthenticatedRootLayout from "./layouts/AuthenticatedRootLayout";
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
import CustomerForm from "./pages/CustomerForm/CustomerForm";

import CustomersPaymentHistory from "./pages/CustomersPaymentHistory ";
import CustomerPaymentForm from "./pages/CustomerPaymentForm";

import ManageCategories from "./pages/ManageCategories";
import { CategoryProvider } from "./pages/ManageCategories/CategoryContext";
import CategoryForm from "./pages/CategoryForm";

import ManageProducts from "./pages/ManageProducts";
import ProductForm from "./components/ProductForm";
import ProductVariantForm from "./pages/ProductVariantForm";
import ProductDetail from "./pages/ProductDetail";

import ManageOrders from "./pages/ManageOrders";
import OrderForm from "./pages/OrderForm";

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
    element: <AuthenticatedRootLayout />,

    children: [
      {
        path: "orders",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <ManageOrders />,
          },
          {
            path: "create",
            element: <OrderForm />,
          },
        ],
      },
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
            element: <Layout />,
            children: [
              {
                path: "",
                element: <CustomersPaymentHistory />,
              },
              {
                path: "create",
                element: <CustomerPaymentForm />,
              },
            ],
          },
        ],
      },
      {
        path: "categories",
        element: <Layout />,
        children: [
          {
            path: "",
            element: (
              <CategoryProvider>
                <ManageCategories />
              </CategoryProvider>
            ),
          },
          {
            path: ":categoryId",
            element: (
              <CategoryProvider>
                <ManageCategories />
              </CategoryProvider>
            ),
          },
        ],
      },

      {
        path: "products",
        element: <Layout />,

        children: [
          {
            path: "",
            element: <ManageProducts />,
          },

          {
            path: "create",
            element: <ProductForm />,
          },

          {
            path: ":id",
            element: <ProductDetail />,
          },

          {
            path: ":id/product-variant/create",
            element: <ProductVariantForm />,
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
