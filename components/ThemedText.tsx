import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/utils/hooks/useThemeColor";
import Size from "@/utils/hooks/useResponsiveSize";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ colorName: "text" });

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Size.calcAverage(16),
    lineHeight: 24,
  },

  defaultSemiBold: {
    fontSize: Size.calcAverage(16),
    lineHeight: 24,
    fontWeight: "600",
  },

  title: {
    fontSize: Size.calcAverage(32),
    fontWeight: "bold",
    lineHeight: 32,
  },

  subtitle: {
    fontSize: Size.calcAverage(20),
    fontWeight: "bold",
  },

  link: {
    lineHeight: 30,
    fontSize: Size.calcAverage(16),
    color: "#0a7ea4",
  },
});
