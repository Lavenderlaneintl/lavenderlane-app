import React from "react";
import { ScrollView, type ViewProps, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/utils/hooks/useThemeColor";

export type ThemedSafeAreaViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  scrollable?: boolean;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  scrollable,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor({ colorName: "background" });
  const containerStyle = [{ backgroundColor }, style];

  return scrollable ? (
    <ScrollView contentContainerStyle={containerStyle} {...otherProps}>
      <SafeAreaView style={styles.safeArea} />
    </ScrollView>
  ) : (
    <SafeAreaView style={containerStyle} {...otherProps} />
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
