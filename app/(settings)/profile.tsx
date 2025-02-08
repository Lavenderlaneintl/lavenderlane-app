import React, { useState } from "react";
import {
  Image,
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

import AppButton from "@/components/AppButton";

import ThemeInput from "@/components/ThemedInput";

const ProfilePage = (): JSX.Element => {
  const [edit, setEdit] = useState(false);

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

            {!edit && (
              <TouchableOpacity onPress={() => setEdit(true)}>
                <ThemedView
                  style={{
                    paddingHorizontal: Size.calcWidth(18),
                    paddingVertical: Size.calcHeight(10),
                    borderRadius: Size.calcWidth(60),
                  }}
                  darkColor="#00000"
                  lightColor="#00000"
                >
                  <ThemedText lightColor="#592E83">Edit</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            )}
          </View>

          <ThemedView style={[{ gap: Size.calcHeight(25) }]}>
            <View style={{ gap: Size.calcHeight(6) }}>
              <ThemedText
                type="title"
                style={{ fontWeight: "600", fontSize: Size.calcWidth(24) }}
              >
                Profile
              </ThemedText>
              <ThemedText
                style={{
                  fontWeight: "500",
                  color: "#9CA0AF",
                  fontSize: Size.calcWidth(14),
                }}
              >
                Here are the information about you
              </ThemedText>
            </View>

            <View
              style={{
                alignItems: "center",
                gap: Size.calcWidth(40),
                width: "100%",
              }}
            >
              <Image
                source={require("@/assets/images/pfp.png")}
                resizeMode="cover"
                style={{
                  width: Size.calcWidth(125),
                  height: Size.calcHeight(125),
                }}
              />

              <View style={{ width: "100%", gap: Size.calcWidth(16) }}>
                <ThemeInput label="First Name" placeholder="Enter first name" />
                <ThemeInput label="Last Name" placeholder="Enter last name" />
                <ThemeInput label="Gender" placeholder="Enter gender" />
                <AppButton title="Save" disabled={!edit} />
              </View>
            </View>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default ProfilePage;

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
