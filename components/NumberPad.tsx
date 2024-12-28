import ArrowLeft from "@/assets/svgs/ArrowLeft";
import Size from "@/utils/hooks/useResponsiveSize";
import SVG from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

interface NumberPadProps {
  onNumberPress: (number: number) => void;
  onFingerprintPress?: () => void;
  onDeletePress: () => void;
  keyPadStyle?: ViewStyle;
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberPress,
  onFingerprintPress,
  onDeletePress,
  keyPadStyle,
}) => {
  const iconColor = useThemeColor({ colorName: "text" });

  const renderNumberButton = (number: number) => (
    <TouchableOpacity
      key={number}
      style={styles.button}
      onPress={() => onNumberPress(number)}
    >
      <ThemedText type="subtitle">{number}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, keyPadStyle]}>
      <ThemedView style={styles.row}>
        {[1, 2, 3].map(renderNumberButton)}
      </ThemedView>
      <ThemedView style={styles.row}>
        {[4, 5, 6].map(renderNumberButton)}
      </ThemedView>
      <ThemedView style={styles.row}>
        {[7, 8, 9].map(renderNumberButton)}
      </ThemedView>
      <ThemedView style={styles.row}>
        {onFingerprintPress ? (
          <TouchableOpacity style={styles.button} onPress={onFingerprintPress}>
            <SVG
              name="finger-print"
              color={iconColor}
              size={Size.calcWidth(30)}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.dummy} />
        )}
        {renderNumberButton(0)}
        <TouchableOpacity style={styles.button} onPress={onDeletePress}>
          <ArrowLeft fill={iconColor} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Size.getHeight() - Size.calcHeight(370),
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },

  dummy: {
    width: Size.calcWidth(60),
    height: Size.calcHeight(60),
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    width: Size.calcWidth(60),
    height: Size.calcHeight(60),
  },
});

export default NumberPad;
