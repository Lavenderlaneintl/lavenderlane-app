import { Theme } from "@react-navigation/native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const whiteColor = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#FFA300",
    lightGrey: "#E0E0E0",
    darkGrey: "#A0A0A0",
    whiteColor,
  },
  dark: {
    text: "#ECEDEE",
    background: "#161622",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#FF8C00",
    lightGrey: "#3A3A3A",
    darkGrey: "#4A4A4A",
    whiteColor,
  },
};

export const LightTheme: Theme = {
  dark: false,
  colors: {
    background: Colors.light.background,
    border: "",
    card: "",
    notification: "",
    text: Colors.light.text,
    primary: "#FFA300",
  },
  fonts: {
    regular: {
      fontFamily: "Inter_400Regular",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "PlusJakartaSans_600SemiBold",
      fontWeight: "600",
    },
    heavy: {
      fontFamily: "PlusJakartaSans_700Bold",
      fontWeight: "700",
    },
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    background: Colors.dark.background,
    border: "",
    card: "",
    notification: "",
    text: Colors.dark.text,
    primary: "#FF8C00",
  },
  fonts: {
    regular: {
      fontFamily: "Inter_400Regular",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "PlusJakartaSans_600SemiBold",
      fontWeight: "600",
    },
    heavy: {
      fontFamily: "PlusJakartaSans_700Bold",
      fontWeight: "700",
    },
  },
};
