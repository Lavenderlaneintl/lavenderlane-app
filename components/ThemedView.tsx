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
  const backgroundColor = useThemeColor({ colorName: "background" });

  return scrollable ? (
    <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  ) : (
    <View style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
