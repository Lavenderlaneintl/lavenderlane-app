import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { Colors } from "@/utils/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "./ThemedText";

interface ThemedBottomSheetProps {
  snapPoints?: (string | number)[];
  children: React.ReactNode;
  contentStyle?: ViewStyle;
  enableDynamicSizing?: boolean;
  title?: string;
}

export type ThemedBottomSheetHandle = {
  expand: () => void;
  collapse: () => void;
};

const ThemedBottomSheet = forwardRef<
  ThemedBottomSheetHandle,
  ThemedBottomSheetProps
>(
  (
    {
      snapPoints = ["45%"],
      children,
      contentStyle,
      enableDynamicSizing = false,
      title,
    },
    ref
  ) => {
    const sheetRef = useRef<BottomSheet>(null);

    const background = useThemeColor({
      colorName: "background",
      props: {
        dark: Colors.dark.card,
      },
    });

    // Expose control methods through ref
    useImperativeHandle(ref, () => ({
      expand: () => sheetRef.current?.snapToIndex(0),
      collapse: () => sheetRef.current?.close(),
    }));

    return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={enableDynamicSizing}
        backgroundStyle={[
          styles.background,
          {
            backgroundColor: background,
          },
        ]}
        handleIndicatorStyle={styles.handle}
        enableHandlePanningGesture={false}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: Size.calcWidth(20),
          }}
        >
          <ThemedText
            style={{
              fontSize: Size.calcWidth(18),
            }}
          >
            {title}
          </ThemedText>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => sheetRef.current?.close()}
            hitSlop={10}
          >
            <MaterialIcons
              name="close"
              size={Size.calcAverage(20)}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <BottomSheetView style={[styles.content, contentStyle]}>
          <ThemedView
            darkColor={Colors.dark.card}
            style={styles.innerContainer}
          >
            {children}
          </ThemedView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  background: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  handle: {
    display: "none",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  innerContainer: {
    flex: 1,
  },

  closeButton: {
    backgroundColor: Colors.light.primary,
    width: Size.calcWidth(38),
    height: Size.calcHeight(38),
    borderRadius: Size.calcAverage(30),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemedBottomSheet;
