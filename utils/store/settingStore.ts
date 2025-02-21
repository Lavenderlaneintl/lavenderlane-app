import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../configs/appStorage";
import STORE_KEYS from "../constants/storeKeys";

type SettingsState = {
  darkMode: boolean;
  faceIdEnabled: boolean;
  requirePasswordOnLogin: boolean;
  isOnboarded: boolean;
  setDarkMode: (enabled: boolean) => void;
  setIsOnboard: (enabled: boolean) => void;
  setFaceIdEnabled: (enabled: boolean) => void;
  setRequirePasswordOnLogin: (enabled: boolean) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: false,
      faceIdEnabled: false,
      requirePasswordOnLogin: true,
      isOnboarded: false,

      setDarkMode: (enabled) => set({ darkMode: enabled }),
      setIsOnboard: (enabled) => set({ isOnboarded: enabled }),
      setFaceIdEnabled: (enabled) => set({ faceIdEnabled: enabled }),
      setRequirePasswordOnLogin: (enabled) =>
        set({ requirePasswordOnLogin: enabled }),

      resetSettings: () => {
        storage.delete(STORE_KEYS.appSettings);
        set({
          darkMode: false,
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
