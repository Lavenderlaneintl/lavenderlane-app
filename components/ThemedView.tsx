import { View, type ViewProps, ScrollView } from "react-native";

import { useThemeColor } from "@/utils/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  scrollable?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  scrollable,
  ...otherProps
}: ThemedViewProps) {
  const themeColor = useThemeColor({ colorName: "background" });
  const backgroundColor =
    lightColor || darkColor
      ? useThemeColor({
          colorName: "background",
          props: { light: lightColor, dark: darkColor },
        })
      : themeColor;

  return scrollable ? (
    <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  ) : (
    <View style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
