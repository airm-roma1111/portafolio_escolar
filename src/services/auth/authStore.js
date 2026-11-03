import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: "VISITANTE",
      refreshToken: null,

      setAuth: ({ user, token, refreshToken, role }) =>
        set({
          user,
          token,
          refreshToken,
          role,
          isAuthenticated: true,
        }),

      setRole: (role) =>
        set({
          role,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          role: "VISITANTE",
          isAuthenticated: false,
        }),
    }),
    {
      name: "portfolio-auth",
    },
  ),
);
