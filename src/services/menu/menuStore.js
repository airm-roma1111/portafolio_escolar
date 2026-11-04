import { create } from "zustand";

export const useMenuStore = create((set) => ({
  menus: [],
  setMenus: (menus) => {
    set({
      menus: menus ?? [],
    });
  },
  clearMenus: () => set({ menus: [] }),
}));
