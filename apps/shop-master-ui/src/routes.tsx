import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RootLayout from './layouts/RootLayout';
import ManageEmployee from './pages/ManageEmployee/ManageEmployee';
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <RootLayout />,

    children: [
      {
        path: '/',
        element: <ManageEmployee />,
      },
    ],
  },
]);
