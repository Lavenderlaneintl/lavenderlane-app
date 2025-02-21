import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "../configs/appStorage";
import { IUserPayload } from "../interfaces/user.interfaces";
import { IAuthData } from "../interfaces/auth.interfaces";
import STORE_KEYS from "../constants/storeKeys";

export type UserStateType = {
  user: IUserPayload | null;
  authData: IAuthData | null;
  setUser: (user: IUserPayload) => void;
  setAuthData: (authData: IAuthData) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStateType>()(
  persist(
    (set) => ({
      user: null,
      authData: null,
      setUser: (user) => set({ user }),
      setAuthData: (authData) => set({ authData }),
      clearUser: () => {
        storage.delete(STORE_KEYS.userData);
        set({ user: null, authData: null });
      },
    }),
    {
      name: STORE_KEYS.userData,
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
