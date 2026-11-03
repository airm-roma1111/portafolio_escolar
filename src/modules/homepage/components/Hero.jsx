import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../services/auth/authStore";

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
      </section>
    </main>
  );
}
