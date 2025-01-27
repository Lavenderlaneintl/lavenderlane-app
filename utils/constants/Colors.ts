import { Theme } from "@react-navigation/native";
import FontsEnum from "./Fonts";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const whiteColor = "#F9F9F9";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#9CA0AF",
    tabIconSelected: "#F9F9F9",
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
    tabIconDefault: "#9CA0AF",
    tabIconSelected: "#F9F9F9",
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
    border: Colors.light.lightGrey,
    card: Colors.light.background,
    notification: Colors.light.tint,
    text: Colors.light.text,
    primary: Colors.light.primary,
  },
  fonts: {
    regular: {
      fontFamily: FontsEnum.font400,
      fontWeight: "400",
    },
    medium: {
      fontFamily: FontsEnum.font500,
      fontWeight: "500",
    },
    bold: {
      fontFamily: FontsEnum.font600,
      fontWeight: "600",
    },
    heavy: {
      fontFamily: FontsEnum.font700,
      fontWeight: "700",
    },
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    background: Colors.dark.background,
    border: Colors.dark.lightGrey,
    card: Colors.dark.background,
    notification: Colors.dark.tint,
    text: Colors.dark.text,
    primary: Colors.dark.primary,
  },
  fonts: {
    regular: {
      fontFamily: FontsEnum.font400,
      fontWeight: "400",
    },
    medium: {
      fontFamily: FontsEnum.font500,
      fontWeight: "500",
    },
    bold: {
      fontFamily: FontsEnum.font600,
      fontWeight: "600",
    },
    heavy: {
      fontFamily: FontsEnum.font700,
      fontWeight: "700",
    },
  },
};
