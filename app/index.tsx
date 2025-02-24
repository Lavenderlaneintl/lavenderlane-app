import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import Size from "@/utils/hooks/useResponsiveSize";
import { useUserStore } from "@/utils/store/userStore";
import { useSettingsStore } from "@/utils/store/settingStore";

const MainScreen = (): JSX.Element => {
  const color = useThemeColor({ colorName: "text" });
  const router = useRouter();

  const { authData } = useUserStore();
  const { isOnboarded } = useSettingsStore();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      // Wait a short delay to ensure hydration
      await new Promise((resolve) => setTimeout(resolve, 100));

      setIsReady(true);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!isReady) return; // Ensure Zustand is ready before navigating

    if (isOnboarded) {
      if (authData) {
        router.replace("/DashboardScreen");
      } else {
        router.replace("/RegisterScreen");
      }
    } else {
      router.replace("/OnboardingScreen");
    }
  }, [isOnboarded, authData, isReady]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={Size.calcAverage(30)} />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
