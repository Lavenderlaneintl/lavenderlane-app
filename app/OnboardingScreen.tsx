import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, ImageBackground, View } from "react-native";

import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedView } from "@/components/ThemedView";
import { setLocalData } from "@/utils/configs/localStorage";
import storeKeys from "@/utils/constants/storeKeys";

const OnboardingScreen = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const pages = [
    {
      image: require("../assets/images/onboarding-1.png"),
      title: "Celebrate love together",
      subtitle:
        "Never miss a special moment. We help you plan, celebrate, and cherish each memory with your partner.",
    },
    {
      image: require("../assets/images/onboarding-2.png"),
      title: "Build Memories, Your Way",
      subtitle:
        "From shared goals to personalized reminders, make every day count with moments and memories.",
    },
    {
      image: require("../assets/images/onboarding-3.png"),
      title: "Keep connection playful",
      subtitle:
        "Add a touch of fun with interactive games and heartfelt messages, designed to keep your bond strong and exciting.",
    },
  ];

  const handleComplete = () => {
    setLocalData(storeKeys.onboarding, "true", () => {
      router.replace("/RegisterScreen");
    });
  };

  const handleNext = (): void => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = (): void => {
    handleComplete();
  };

  return (
    <ImageBackground
      source={pages[currentIndex].image}
      style={styles.backgroundImage}
    >
      <ThemedView style={styles.overlay}>
        <ThemedText style={styles.title}>
          {pages[currentIndex].title}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {pages[currentIndex].subtitle}
        </ThemedText>

        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>

        <AppButton
          title={currentIndex < pages.length - 1 ? "Next" : "Get Started"}
          onPress={handleNext}
        />
        <AppButton
          title="Skip"
          onPress={handleSkip}
          style={styles.skipButton}
        />
      </ThemedView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(40),
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    justifyContent: "flex-end",
  },

  title: {
    fontSize: Size.calcWidth(24),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: Size.calcHeight(10),
  },

  subtitle: {
    fontSize: Size.calcWidth(16),
    textAlign: "center",
    color: "white",
    marginBottom: Size.calcHeight(20),
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Size.calcHeight(20),
  },

  dot: {
    width: Size.calcWidth(8),
    height: Size.calcWidth(8),
    borderRadius: Size.calcWidth(4),
    backgroundColor: "white",
    marginHorizontal: Size.calcWidth(4),
    opacity: 0.5,
  },

  activeDot: {
    width: Size.calcWidth(20),
    backgroundColor: "#592E83",
    opacity: 1,
  },

  skipButton: {
    backgroundColor: "rgba(225, 226, 229, 0.2)",
    marginTop: Size.calcHeight(20),
  },
});

export default OnboardingScreen;
