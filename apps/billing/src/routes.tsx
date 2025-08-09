import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/Login";
import BillingPage from "./pages/Billing";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <BillingPage />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
