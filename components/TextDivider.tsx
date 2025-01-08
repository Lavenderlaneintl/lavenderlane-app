import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedView } from "./ThemedView";

const DividerWithText = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <ThemedView style={styles.textWrapper}>
        <ThemedText style={styles.text}>{text}</ThemedText>
      </ThemedView>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Size.calcHeight(30),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D3D3D3",
  },

  textWrapper: {
    position: "relative",
    paddingHorizontal: 10,
    zIndex: 1,
  },

  text: {
    fontSize: Size.calcAverage(16),
    fontWeight: "500",
    color: "#9CA0AF",
    textTransform: "uppercase",
  },
});

export default DividerWithText;
