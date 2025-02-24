import { useColorScheme as useSystemColorScheme } from "react-native";
import { useSettingsStore } from "../store/settingStore";

export function useColorScheme(): "light" | "dark" {
  const systemTheme = useSystemColorScheme();
  const { darkMode } = useSettingsStore();

  if (darkMode === "system") {
    return systemTheme === "light" ? "light" : "dark";
  }

  return darkMode === "light" ? "light" : "dark";
}
