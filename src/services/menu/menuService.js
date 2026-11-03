import { ENV } from "../../config/env";

const API_URL = ENV.API_URL;

export async function getMyMenu(token) {
  const response = await fetch(`${API_URL}/navigation/my-menu`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo menú");
  }

  return response.json();
}
