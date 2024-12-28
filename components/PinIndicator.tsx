import React from "react";
import { View, StyleSheet } from "react-native";

import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

interface PinIndicatorProps {
  numberOfPins: number;
  pinArray: any[];
}

const PinIndicator: React.FC<PinIndicatorProps> = ({
  numberOfPins,
  pinArray,
}) => {
  const inActive = useThemeColor({ colorName: "lightGrey" });
  const active = useThemeColor({ colorName: "darkGrey" });

  return (
    <View style={styles.wrapper}>
      {Array.from({ length: numberOfPins }, (_, index) => (
        <ThemedView
          key={index}
          style={[
            { ...styles.box, backgroundColor: inActive },
            pinArray[index] !== undefined &&
              pinArray[index] !== null && {
                backgroundColor: active,
              },
          ]}
        />
      ))}
    </View>
  );
};

export default PinIndicator;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: Size.calcWidth(20),
    height: Size.calcHeight(20),
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
