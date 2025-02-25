import React, { FC } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

export interface ThemedTextareaProps extends TextInputProps {
  label?: string;
  errorText?: string;
  lightColor?: string;
  darkColor?: string;
}

export const ThemedTextarea: FC<ThemedTextareaProps> = ({
  label,
  errorText,
  style,
  lightColor,
  darkColor,
  placeholder,
  placeholderTextColor,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor({
    props: { light: lightColor, dark: darkColor },
    colorName: "background",
  });
  const textColor = useThemeColor({
    colorName: "text",
    props: { dark: "black" },
  });
  const iconColor = useThemeColor({ colorName: "icon" });
  const borderColor = errorText ? "red" : iconColor;
  const placeholderColor = placeholderTextColor || iconColor;
  const cursorColor = textColor;

  return (
    <ThemedView style={[styles.container, style as ViewStyle]}>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <ThemedView
        style={[styles.textareaWrapper, { backgroundColor, borderColor }]}
      >
        <TextInput
          style={[
            styles.textarea,
            { color: textColor },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          multiline={true}
          cursorColor={cursorColor}
          textAlignVertical="top" 
          {...otherProps}
        />
      </ThemedView>
      {errorText && (
        <ThemedText style={styles.errorText} type="default">
          {errorText}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default ThemedTextarea;

const styles = StyleSheet.create({
  container: {
    marginVertical: Size.calcHeight(10),
    width: "100%",
    backgroundColor: "transparent",
  },

  label: {
    marginBottom: Size.calcHeight(5),
    fontSize: Size.calcAverage(14),
  },

  textareaWrapper: {
    borderWidth: 0.6,
    paddingHorizontal: 10,
    borderRadius: Size.calcAverage(15), 
    minHeight: Size.calcHeight(120), 
  },

  textarea: {
    flex: 1,
    fontSize: Size.calcAverage(16),
    lineHeight: 22,
    paddingTop: 10, 
  },

  errorText: {
    marginTop: Size.calcHeight(5),
    color: "red",
    fontSize: Size.calcAverage(14),
    fontWeight: "500",
  },
});
