import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getGoogleAuthUrl } from "../../auth/authService";

import { useAuthStore } from "../../../services/auth/authStore";

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  async function handleGoogleRegister() {
    try {
      setLoadingGoogle(true);

      const response = await getGoogleAuthUrl();

      window.location.href = response.authUrl;
    } catch (error) {
      console.error(error);

      alert(error.message);

      setLoadingGoogle(false);
    }
  }

  return (
    <main className="app-container">
      <section className="hero">
        <span className="hero-badge">Portafolio Escolar</span>

        <h1>Isaí Miranda</h1>

        {/* <p className="hero-description">
          Desarrollo de software, proyectos académicos, evidencias técnicas y
          crecimiento profesional.
        </p> */}

        <span className="hero-copy">© 2026 Isaí Miranda</span>

        {!isAuthenticated && (
          <div className="hero-actions">
            <button className="login-btn" onClick={() => navigate("/login")}>
              🔐 Iniciar Sesión
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <br />

            <button
              className="login-btn"
              disabled={loadingGoogle}
              onClick={handleGoogleRegister}
            >
              {loadingGoogle
                ? "Conectando con Google..."
                : "Regístrate con Google"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
