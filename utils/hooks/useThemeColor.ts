import { Colors } from "@/utils/constants/Colors";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor({
  props,
  colorName,
}: {
  props?: { light?: string; dark?: string };
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark;
}) {
  const theme = useColorScheme() ?? "dark";
  const colorFromProps = props && props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
