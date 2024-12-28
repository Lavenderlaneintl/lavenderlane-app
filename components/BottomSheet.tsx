import React, { useEffect, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemedView } from "./ThemedView";

interface ThemedBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
  contentStyle?: ViewStyle;
  children: React.ReactNode;
}

const ThemedBottomSheet: React.FC<ThemedBottomSheetProps> = ({
  visible,
  onClose,
  snapPoints = ["50%"],
  enablePanDownToClose = false,
  contentStyle,
  children,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Handle modal visibility
  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    }
    console.log({ visible });
  }, [visible]);

  // Handle modal close event
  const handleClose = () => {
    bottomSheetModalRef.current?.close();
    onClose();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      // onDismiss={handleClose}
      snapPoints={snapPoints}
      enablePanDownToClose={enablePanDownToClose}
      containerStyle={styles.containerStyle}
    >
      <ThemedView style={[styles.contentContainer, contentStyle]}>
        {children}
      </ThemedView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderRadius: 20,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default ThemedBottomSheet;
