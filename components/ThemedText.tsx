import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/utils/hooks/useThemeColor";
import Size from "@/utils/hooks/useResponsiveSize";
import FontsEnum from "@/utils/constants/Fonts";

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
  const themeColor = useThemeColor({ colorName: "text" });
  const color =
    lightColor || darkColor
      ? useThemeColor({
          colorName: "text",
          props: { light: lightColor, dark: darkColor },
        })
      : themeColor;

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
    fontFamily: FontsEnum.font400,
  },

  defaultSemiBold: {
    fontSize: Size.calcAverage(16),
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontsEnum.font500,
  },

  title: {
    fontSize: Size.calcAverage(32),
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: FontsEnum.font700,
  },

  subtitle: {
    fontSize: Size.calcAverage(20),
    fontWeight: "bold",
    fontFamily: FontsEnum.font600,
  },

  link: {
    lineHeight: 30,
    fontSize: Size.calcAverage(16),
    color: "#0a7ea4",
  },
});
