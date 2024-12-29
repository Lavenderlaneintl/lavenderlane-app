import React, { FC, useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

export interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  label?: string;
  errorText?: string;
  lightColor?: string;
  darkColor?: string;
}

const ThemeInput: FC<InputProps> = ({
  leftIcon,
  rightIcon,
  isPassword = false,
  label,
  errorText,
  style,
  lightColor,
  darkColor,
  placeholder,
  placeholderTextColor,
  ...otherProps
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const backgroundColor = useThemeColor({
    props: { light: lightColor, dark: darkColor },
    colorName: "background",
  });
  const textColor = useThemeColor({ colorName: "text" });
  const iconColor = useThemeColor({ colorName: "icon" });
  const borderColor = errorText ? "red" : iconColor;
  const placeholderColor = placeholderTextColor || iconColor;
  const cursorColor = textColor;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <ThemedView style={[styles.container, style as ViewStyle]}>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <ThemedView
        style={[styles.inputWrapper, { backgroundColor, borderColor }]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : {},
            { color: textColor },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          secureTextEntry={isPassword && !isPasswordVisible}
          cursorColor={cursorColor}
          {...otherProps}
        />
        {isPassword ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.icon}>{rightIcon}</View>
        )}
      </ThemedView>
      {errorText && (
        <ThemedText style={styles.errorText} type="default">
          {errorText}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default ThemeInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: Size.calcHeight(10),
    width: "100%",
    borderRadius: Size.calcAverage(25),
    backgroundColor: "transparent",
  },

  label: {
    marginBottom: Size.calcHeight(5),
    fontSize: Size.calcAverage(14),
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    paddingHorizontal: 10,
    borderRadius: Size.calcAverage(25),
    height: Size.calcHeight(50),
  },

  input: {
    flex: 1,
    fontSize: Size.calcAverage(16),
  },

  inputWithLeftIcon: {
    marginLeft: 8,
  },

  icon: {
    marginHorizontal: 5,
  },

  errorText: {
    marginTop: Size.calcHeight(5),
    color: "red",
    fontSize: Size.calcAverage(12),
  },
});
