import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  ActivityIndicator,
  Platform,
  Text,
} from "react-native";

import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";

export interface AppButtonProps extends TouchableOpacityProps {
  textStyles?: TextStyle;
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const AppButton = ({
  style,
  title,
  onPress,
  loading,
  icon,
}: AppButtonProps): JSX.Element => {
  const color = useThemeColor({ colorName: "text" });
  const styles = dynamicStyles();

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[
        styles.button,
        style,
        Platform.OS === "ios" && { overflow: "visible" },
      ]}
    >
      {loading ? (
        <ActivityIndicator size={Size.calcAverage(30)} color={color} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              icon ? { marginLeft: Size.calcWidth(10) } : {},
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const dynamicStyles = () =>
  StyleSheet.create({
    button: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: Size.calcAverage(25),
      height: Size.calcHeight(50),
      width: "100%",
      overflow: Platform.OS === "ios" ? "visible" : "hidden",
      backgroundColor: "#592E83",
    },

    text: {
      fontSize: Size.calcWidth(16),
      fontWeight: "bold",
      color: "white",
    },
  });

export default AppButton;
