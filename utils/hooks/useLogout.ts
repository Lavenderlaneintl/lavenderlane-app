import { useRouter } from "expo-router";
import { useUserStore } from "../store/userStore";
import { useSettingsStore } from "../store/settingStore";
import { storage } from "../configs/appStorage";

const useLogout = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const { setIsOnboard } = useSettingsStore();

  const logout = () => {
    clearUser();
    setIsOnboard(false);

    storage.clearAll();

    router.replace("/LoginScreen");
  };

  return logout;
};

export default useLogout;
