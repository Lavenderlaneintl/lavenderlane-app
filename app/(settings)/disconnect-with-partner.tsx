import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const DisconnectWithPartner = (): JSX.Element => {
  return (
    <>
      {Platform.OS === "ios" && <View style={styles.statusBarBackground} />}
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Platform.OS === "android" ? "#AF8BEA" : "transparent"}
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.wrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ThemedView
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <ThemedText type="default">Disconnect with Partner</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default DisconnectWithPartner;

const styles = StyleSheet.create({
  statusBarBackground: {
    height: StatusBar.currentHeight || 44,
    backgroundColor: "#AF8BEA",
  },

  container: {
    flex: 1,
    backgroundColor: "#AF8BEA",
    paddingTop:
      Platform.OS === "android"
        ? Size.calcHeight(StatusBar.currentHeight || 50)
        : Size.calcHeight(20),
  },

  wrapper: {
    flex: 1,
    position: "relative",
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    gap: Size.calcWidth(20),
    padding: Size.calcAverage(20),
  },

  backIcon: {
    width: Size.calcWidth(40),
    height: Size.calcWidth(40),
    backgroundColor: "#592E83",
    borderRadius: Size.calcWidth(40),
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: Size.calcWidth(18),
    fontWeight: "medium",
    textAlign: "left",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },

  note: {
    opacity: 0.7,
    marginTop: Size.calcHeight(10),
    fontSize: Size.calcWidth(18),
  },

  resend: {
    alignSelf: "center",
    marginTop: Size.calcHeight(20),
  },

  loader: {
    position: "absolute",
    right: Size.calcWidth(20),
    top: Size.calcHeight(60),
  },

  featuresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Size.calcWidth(28),
  },

  featuretext: {
    fontSize: Size.calcWidth(14),
    fontWeight: "semibold",
    color: "#373D51",
  },

  icon: {
    width: Size.calcWidth(36),
    height: Size.calcHeight(36),
  },

  language: {
    flexDirection: "row",
    padding: Size.calcWidth(15),
    width: "100%",
    backgroundColor: "#F4F4F6",
    borderRadius: Size.calcWidth(16),
  },

  addButton: {
    backgroundColor: "#592E83",
    borderRadius: Size.calcWidth(38),
    padding: Size.calcWidth(15),
    justifyContent: "center",
    position: "absolute",
    right: 28,
    bottom: Size.calcHeight(100),
    width: Size.calcWidth(62),
    height: Size.calcHeight(62),
    alignItems: "center",
  },
});
