import { RouterProvider } from "react-router-dom";
import HackerBackground from "../components/particles/HackerBackground";
import { router } from "../router";

import { useEffect } from "react";

import { getMyProfile } from "../modules/auth/authService";
import { useAuthStore } from "../services/auth/authStore";

import { getMyMenu } from "../services/menu/menuService";
import { useMenuStore } from "../services/menu/menuStore";

export default function App() {
  const setRole = useAuthStore((state) => state.setRole);

  const setMenus = useMenuStore((state) => state.setMenus);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      setRole("VISITANTE");

      setMenus([]);

      return;
    }

    async function bootstrap() {
      try {
        const profile = await getMyProfile(token);

        const roles = profile.roles ?? [];

        if (roles.includes("ADMINISTRATOR")) {
          setRole("ADMINISTRATOR");
        } else if (roles.includes("COLLABORATOR")) {
          setRole("COLLABORATOR");
        } else if (roles.includes("GUEST")) {
          setRole("GUEST");
        } else {
          setRole("VISITANTE");
        }

        const menu = await getMyMenu(token);

        setMenus(menu);
      } catch (error) {
        console.error(error);

        setRole("VISITANTE");

        setMenus([]);
      }
    }

    bootstrap();
  }, [token, setRole, setMenus]);

  return (
    <>
      <RouterProvider router={router} />
      <HackerBackground />
      {/* <HomePage /> */}
    </>
  );
}
