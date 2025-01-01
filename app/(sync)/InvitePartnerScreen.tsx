import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import GroupUsers from "@/assets/svgs/GroupUsers";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import AppButton from "@/components/AppButton";

const InvitePartnerScreen = (): JSX.Element => {
  const router = useRouter();
  const partnerName = useLocalSearchParams().partnerName ?? "";

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
          <View style={styles.groupCta}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipIcon}>
              <Text>Skip</Text>
            </TouchableOpacity>
          </View>
          <GroupUsers />
          <ThemedText style={{ marginTop: Size.calcHeight(40) }} type="title">
            Invite your partner
          </ThemedText>
          <ThemedText lightColor="#592E83" darkColor="#AF8BEA" type="subtitle">
            ({partnerName})
          </ThemedText>
          <ThemedText
            style={{
              marginVertical: Size.calcHeight(40),
              fontSize: Size.calcAverage(20),
            }}
          >
            Using
          </ThemedText>
          <AppButton style={styles.btn} secondary title="QR Code" />
          <AppButton style={styles.btn} secondary title="Passcode" />
          <AppButton style={styles.btn} secondary title="Invite Link" />
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default InvitePartnerScreen;

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
    alignItems: "center",
  },

  groupCta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: Size.calcHeight(100),
  },

  backIcon: {
    width: Size.calcWidth(40),
    height: Size.calcWidth(40),
    backgroundColor: "#592E83",
    borderRadius: Size.calcWidth(40),
    justifyContent: "center",
    alignItems: "center",
  },

  skipIcon: {
    width: Size.calcWidth(70),
    height: Size.calcWidth(30),
    backgroundColor: "#AF8BEA",
    borderRadius: Size.calcWidth(10),
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    marginBottom: Size.calcHeight(20),
  },
});
