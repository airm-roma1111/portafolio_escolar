import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import NotFound from "../system-pages/NotFound";

import { HomePage } from "../modules/homepage";
import ComingSoon from "../system-pages/ComingSoon";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sobre-mi",
        element: <ComingSoon />,
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
