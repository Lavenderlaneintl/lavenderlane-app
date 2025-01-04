import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { useThemeColor } from "@/utils/hooks/useThemeColor";
import Size from "@/utils/hooks/useResponsiveSize";
import { getLocalData } from "@/utils/configs/localStorage";

const MainScreen = (): JSX.Element => {
  const color = useThemeColor({ colorName: "text" });
  const router = useRouter();
  useEffect(() => {
    const checkOnboard = async () => {
      try {
        const isOnboard = await getLocalData("isOnboard");
        if (isOnboard) {
          router.push("/RegisterScreen");
        } else {
          router.push("/OnboardingScreen");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        // Handle error if needed
      }
    };

    checkOnboard();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={Size.calcAverage(30)} />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
