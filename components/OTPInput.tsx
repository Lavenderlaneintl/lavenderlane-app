import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TextInputProps,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";

interface OTPInputProps {
  pin: number[];
  pinLength: number;
  onPinChange: (newPin: number[]) => void; // Callback to update the pin state
}

const OTPInput: React.FC<OTPInputProps> = ({ pin, pinLength, onPinChange }) => {
  const textInputRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    // Keep only numbers, limit to pinLength, and update the pin array
    const sanitizedInput = text.replace(/[^0-9]/g, "").slice(0, pinLength);
    const newPin = sanitizedInput.split("").map(Number);
    onPinChange(newPin);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Invisible TextInput for capturing auto-fill OTP */}
      <TextInput
        ref={textInputRef}
        style={styles.hiddenInput}
        value={pin.join("")} // Join pin array as a string
        onChangeText={handleTextChange}
        keyboardType="numeric"
        maxLength={pinLength}
        autoComplete="sms-otp" // iOS auto-fill hint
        textContentType="oneTimeCode" // iOS OTP suggestion
        autoFocus
        onSubmitEditing={Keyboard.dismiss}
        editable={false}
      />

      {/* OTP Input UI */}
      {Array.from({ length: pinLength }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.inputBox,
            pin[index] !== undefined
              ? styles.filledInputBox
              : styles.emptyInputBox,
          ]}
        >
          <ThemedText style={styles.inputText}>
            {pin[index] !== undefined ? pin[index] : ""}
          </ThemedText>
        </View>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: Size.calcHeight(20),
  },

  inputBox: {
    width: Size.calcWidth(50),
    height: Size.calcHeight(50),
    borderRadius: Size.calcWidth(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },

  emptyInputBox: {
    borderColor: "#ccc",
  },

  filledInputBox: {
    borderColor: "#AF8BEA",
    backgroundColor: "#EED6F4",
  },

  inputText: {
    fontSize: Size.calcWidth(24),
    fontWeight: "bold",
    color: "#592E83",
  },

  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default OTPInput;
