import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AppButton from "@/components/AppButton";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";

const ComingSoonScreen = () => {
  const router = useRouter();

  const iconColor = useThemeColor({ colorName: "text" });

  const handleLearnMore = async () => {
    const url = "https://www.lavenderlaneinternational.com/faq";
    await Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={Size.calcWidth(24)}
          color={iconColor}
        />
      </TouchableOpacity>

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
          onPress={handleLearnMore}
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

  backButton: {
    position: "absolute",
    top: Size.calcHeight(20),
    left: Size.calcWidth(20),
    zIndex: 10,
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
