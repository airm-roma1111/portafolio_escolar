import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getMyProfile, googleCallback } from "../authService";

import { getMyMenu } from "../../../services/menu/menuService";

import { useAuthStore } from "../../../services/auth/authStore";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) {
      return;
    }

    processedRef.current = true;
    const processLogin = async () => {
      try {
        const hash = window.location.hash.substring(1);

        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");

        if (!accessToken) {
          navigate("/login");
          return;
        }

        const auth = await googleCallback(accessToken);

        const profile = await getMyProfile(auth.accessToken);
        console.log(JSON.stringify(profile, null, 2));

        await getMyMenu(auth.accessToken);

        setAuth({
          user: profile,
          token: auth.accessToken,
          refreshToken: auth.refreshToken,
          role: profile.roles?.includes("ADMINISTRATOR")
            ? "ADMINISTRATOR"
            : "INVITADO",
        });

        navigate("/");
      } catch (error) {
        console.error(error);

        navigate("/login");
      }
    };

    processLogin();
  }, [navigate, setAuth]);

  return <div>Procesando autenticación con Google...</div>;
}
