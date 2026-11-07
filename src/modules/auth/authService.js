import { ENV } from "../../config/env";

const API_URL = ENV.API_URL;

export async function login(payload) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return response.json();
}

export async function getMyProfile(token) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Sesión inválida");
  }

  return response.json();
}

export async function logout(token) {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error cerrando sesión");
  }

  return response.json();
}

export async function getGoogleAuthUrl() {
  const response = await fetch(`${API_URL}/auth/google`);

  if (!response.ok) {
    throw new Error("Error obteniendo URL de Google");
  }

  return response.json();
}

export async function googleCallback(accessToken) {
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
    throw new Error("Error procesando OAuth Google");
  }

  return response.json();
}
