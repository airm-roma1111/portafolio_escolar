import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const processLogin = async () => {
      try {
        const hash = window.location.hash.substring(1);

        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");

        console.log("OAuth Hash:", window.location.hash);

        console.log("Access Token:", accessToken);

        if (!accessToken) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/auth/google/callback`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            accessToken,
          }),
        });

        if (!response.ok) {
          throw new Error("Error callback OAuth");
        }

        const data = await response.json();

        console.log("Google callback", data);

        navigate("/");
      } catch (error) {
        console.error(error);

        navigate("/login");
      }
    };

    processLogin();
  }, [navigate]);

  return <div>Procesando autenticación...</div>;
}
