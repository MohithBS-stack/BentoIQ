import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LS_KEYS } from "@/lib/constants";

interface UIState {
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  theme: "dark" | "light";
  activeModal: string | null;
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setTheme: (theme: "dark" | "light") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      commandPaletteOpen: false,
      theme: "dark",
      activeModal: null,

      toggleSidebar: () =>
        set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleCommandPalette: () =>
        set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      openModal:  (id) => set({ activeModal: id }),
      closeModal: ()   => set({ activeModal: null }),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: LS_KEYS.SIDEBAR_OPEN,
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme:       state.theme,
      }),
    }
  )
);
