import { useRouter } from "expo-router";
import { useCallback } from "react";
import { clearAllLocalData } from "../configs/localStorage";

const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    // Clear user data from local storage or cookies
    clearAllLocalData().then(() => {
      // Redirect to login page
      router.dismissTo("/LoginScreen");
    });
  }, []);

  return logout;
};

export default useLogout;
