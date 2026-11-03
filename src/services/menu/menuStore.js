import { create } from "zustand";

export const useMenuStore = create((set) => ({
  menus: [],
  setMenus: (menus) => {
    console.log("[SET MENUS]", menus);
    set({ menus });
  },
  clearMenus: () => set({ menus: [] }),
}));
