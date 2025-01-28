import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AppButton from "@/components/AppButton";
import Size from "@/utils/hooks/useResponsiveSize";
import { useRouter } from "expo-router";

const ComingSoonScreen = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <LottieView
          autoPlay
          style={styles.image}
          source={require("../../assets/animations/comingSoon.json")}
        />

        <ThemedText type="subtitle" style={styles.subtitle}>
          We're working hard to bring you this amazing feature. Stay tuned for
          updates!
        </ThemedText>

        <AppButton
          title="Learn more"
          style={styles.button}
          onPress={() => router.back()}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Size.calcWidth(18),
  },

  content: {
    alignItems: "center",
  },

  image: {
    width: Size.calcWidth(200),
    height: Size.calcHeight(200),
  },

  subtitle: {
    fontSize: Size.calcWidth(16),
    textAlign: "center",
    marginBottom: Size.calcHeight(24),
  },

  button: {
    width: Size.calcWidth(160),
    height: Size.calcHeight(46),
    borderRadius: Size.calcWidth(8),
  },
});

export default ComingSoonScreen;
