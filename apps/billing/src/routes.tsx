import { createBrowserRouter } from "react-router-dom";

import AuthenticatedRootLayout from "./layouts/AuthenticatedRootLayout";
import Layout from "./layouts/Layout";

import LoginPage from "./pages/Login";
import BillingPage from "./pages/Billing";
import ConfigPage from "./pages/Config";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/config",
    element: <ConfigPage />,
  },
  {
    path: "/",
    element: <AuthenticatedRootLayout />,
    children: [
      {
        path: "",
        element: <BillingPage />,
      },
      {
        path: "billing",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <BillingPage />,
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
