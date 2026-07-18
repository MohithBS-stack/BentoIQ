import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserSettings {
  theme: "dark" | "light";
  currency: "USDC" | "USD";
  notifications: {
    marketUpdates: boolean;
    aiInsights: boolean;
    portfolioAlerts: boolean;
  };
}

interface SettingsState {
  settings: UserSettings;
  setTheme: (theme: "dark" | "light") => void;
  setCurrency: (currency: "USDC" | "USD") => void;
  toggleNotification: (key: keyof UserSettings["notifications"]) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        theme: "dark",
        currency: "USDC",
        notifications: {
          marketUpdates: true,
          aiInsights: true,
          portfolioAlerts: true,
        },
      },
      setTheme: (theme) =>
        set((state) => ({ settings: { ...state.settings, theme } })),
      setCurrency: (currency) =>
        set((state) => ({ settings: { ...state.settings, currency } })),
      toggleNotification: (key) =>
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: {
              ...state.settings.notifications,
              [key]: !state.settings.notifications[key],
            },
          },
        })),
    }),
    {
      name: "bentoiq:settings",
    }
  )
);
