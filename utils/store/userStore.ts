import { useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useQuery } from "@tanstack/react-query";
import { storage } from "../configs/appStorage";
import { IUserPayload } from "../interfaces/user.interfaces";
import { IAuthData } from "../interfaces/auth.interfaces";
import STORE_KEYS from "../constants/storeKeys";
import { QueryObserverResult } from "@tanstack/react-query";
import useLogout from "../hooks/useLogout";
import { getUserDetails } from "../apis/user";

export type UserStateType = {
  user: IUserPayload | null;
  spouse: IUserPayload | null;
  authData: IAuthData | null;
  isLoading: boolean;
  isRefetching: boolean;
  refetchUser: () => Promise<QueryObserverResult<unknown, Error>>;
  setUser: (user: IUserPayload) => void;
  setAuthData: (authData: IAuthData) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStateType>()(
  persist(
    (set) => ({
      user: null,
      spouse: null,
      authData: null,
      isLoading: false,
      isRefetching: false,
      refetchUser: () =>
        Promise.resolve({} as QueryObserverResult<unknown, Error>),
      setUser: (user: IUserPayload) => set({ user }),
      setAuthData: (authData: IAuthData) => set({ authData }),
      clearUser: () => {
        set({ user: null, authData: null, isLoading: false });
        useLogout();
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
      partialize: (state) => ({
        user: state.user,
        authData: state.authData,
      }),
    }
  )
);

export const useInitializeUser = () => {
  const { authData, clearUser, setUser } = useUserStore();

  const {
    data,
    isPending: queryIsLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", authData?.id],
    queryFn: () => getUserDetails(authData?.id || ""),
    enabled: !!authData?.id,
  });

  useEffect(() => {
    if (data) {
      useUserStore.setState({
        user: data[0],
        spouse: data[1],
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) clearUser();
  }, [error, clearUser]);

  useEffect(() => {
    useUserStore.setState({ isRefetching: isFetching });
  }, [isFetching]);

  useEffect(() => {
    useUserStore.setState({ isLoading: queryIsLoading });
  }, [queryIsLoading]);

  useEffect(() => {
    useUserStore.setState({ refetchUser: refetch });
  }, [refetch]);

  return { isLoading: queryIsLoading };
};
