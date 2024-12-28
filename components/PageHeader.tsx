import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Size from "@/utils/hooks/useResponsiveSize";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { useRouter } from "expo-router";

interface IProps {
  title: string;
}

const PageHeader: React.FC<IProps> = ({ title }) => {
  const iconColor = useThemeColor({ colorName: "text" });
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={() => router.back()}
    >
      <Ionicons
        name="arrow-back-outline"
        color={iconColor}
        size={Size.calcAverage(30)}
      />
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: Size.calcHeight(20),
    marginBottom: Size.calcHeight(10),
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: Size.calcAverage(28),
    marginLeft: Size.calcWidth(10),
  },
});

export default PageHeader;
