import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import NotFound from "../system-pages/NotFound";

import { HomePage } from "../modules/homepage";
import ComingSoon from "../system-pages/ComingSoon";

import AuthCallbackPage from "../modules/auth/pages/AuthCallbackPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import SobreMiPage from "../modules/sobreMi/pages/SobreMiPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/callback",
        element: <AuthCallbackPage />,
      },
      {
        path: "/registro",
        element: <RegisterPage />,
      },
      {
        path: "/sobre-mi",
        element: <SobreMiPage />,
      },
      {
        path: "/proyectos",
        element: <ComingSoon />,
      },
      {
        path: "/estudios",
        element: <ComingSoon />,
      },
      {
        path: "/contacto",
        element: <ComingSoon />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
