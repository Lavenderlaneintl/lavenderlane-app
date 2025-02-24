import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../configs/appStorage";
import STORE_KEYS from "../constants/storeKeys";

type SettingsState = {
  faceIdEnabled: boolean;
  requirePasswordOnLogin: boolean;
  isOnboarded: boolean;
  setIsOnboard: (enabled: boolean) => void;
  setFaceIdEnabled: (enabled: boolean) => void;
  setRequirePasswordOnLogin: (enabled: boolean) => void;
  resetSettings: () => void;
  darkMode: "system" | "light" | "dark";
  setDarkMode: (mode: "system" | "light" | "dark") => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: "system",
      faceIdEnabled: false,
      requirePasswordOnLogin: true,
      isOnboarded: false,

      setDarkMode: (mode) => set({ darkMode: mode }),
      setIsOnboard: (enabled) => set({ isOnboarded: enabled }),
      setFaceIdEnabled: (enabled) => set({ faceIdEnabled: enabled }),
      setRequirePasswordOnLogin: (enabled) =>
        set({ requirePasswordOnLogin: enabled }),

      resetSettings: () => {
        storage.delete(STORE_KEYS.appSettings);
        set({
          darkMode: "system",
          faceIdEnabled: false,
          requirePasswordOnLogin: true,
        });
      },
    }),
    {
      name: STORE_KEYS.appSettings,
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => storage.set(name, JSON.stringify(value)),
        removeItem: (name) => storage.delete(name),
      })),
    }
  )
);
