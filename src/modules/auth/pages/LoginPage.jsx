import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getGoogleAuthUrl, getMyProfile, login } from "../authService";

import { useAuthStore } from "../../../services/auth/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    console.log("handleGoogleLogin");
    try {
      setLoading(true);

      const response = await getGoogleAuthUrl();

      window.location.href = response.authUrl;
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const auth = await login(form);

      const profile = await getMyProfile(auth.accessToken);

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-badge">PORTAFOLIO ESCOLAR</span>

          <h1>Iniciar Sesión</h1>

          {/* <p>
            Accede a tu espacio personalizado y visualiza contenido acorde a tus
            permisos.
          </p> */}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo Electrónico</label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>

            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button className="login-submit-btn" disabled={loading} type="submit">
            {loading ? "Validando credenciales..." : "🔐 Ingresar"}
          </button>

          <button
            className="login-submit-btn"
            disabled={loading}
            type="button"
            onClick={handleGoogleLogin}
          >
            Iniciar con Google
          </button>
        </form>

        {/* <div className="login-footer">Sistema IAM + RBAC</div> */}
      </div>
    </main>
  );
}
