import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "@/components/ThemedText";

const DisplayQRCodeScreen = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      {/* Background for StatusBar on iOS */}
      {Platform.OS === "ios" && <View style={styles.statusBarBackground} />}
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Platform.OS === "android" ? "#AF8BEA" : "transparent"}
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.wrapper}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <ThemedText type="title" style={{ marginTop: Size.calcHeight(30) }}>
            Use QR Code
          </ThemedText>
          <ThemedText style={styles.note}>
            Ask your partner to scan to sync up with you
          </ThemedText>
          <View style={styles.code}>
            <QRCode
              value="http://awesome.link.qr"
              size={Size.calcAverage(270)}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default DisplayQRCodeScreen;

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
    width: "100%",
  },

  wrapper: {
    flex: 1,
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    padding: Size.calcAverage(20),
    width: "100%",
  },

  backIcon: {
    width: Size.calcWidth(40),
    height: Size.calcWidth(40),
    backgroundColor: "#592E83",
    borderRadius: Size.calcWidth(40),
    justifyContent: "center",
    alignItems: "center",
  },

  note: {
    opacity: 0.7,
    marginTop: Size.calcHeight(10),
    fontSize: Size.calcWidth(18),
  },

  code: {
    flex: 1,
    alignItems: "center",
    marginTop: Size.calcHeight(100),
  },
});
