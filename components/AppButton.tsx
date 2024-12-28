import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "./ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";

export interface AppButtonProps extends TouchableOpacityProps {
  textStyles?: TextStyle;
  title: string;
  loading?: boolean;
}

const AppButton = ({
  style,
  title,
  onPress,
  loading,
}: AppButtonProps): JSX.Element => {
  const color = useThemeColor({ colorName: "text" });
  const styles = dynamicStyles();

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[
        styles.touchable,
        style,
        Platform.OS === "ios" && { overflow: "visible" },
      ]}
    >
      <LinearGradient
        colors={["#4A6CF7", "#FFA300"]}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size={Size.calcAverage(30)} color={color} />
        ) : (
          <ThemedText type="subtitle">{title}</ThemedText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const dynamicStyles = () =>
  StyleSheet.create({
    touchable: {
      width: "100%",
      borderRadius: Size.calcAverage(16),
      overflow: Platform.OS === "ios" ? "visible" : "hidden",
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: Size.calcAverage(16),
      height: Size.calcHeight(60),
      width: "100%",
    },
  });

export default AppButton;
