import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "@/components/ThemedText";
import ThemeInput from "@/components/ThemedInput";
import AppButton from "@/components/AppButton";
import ReminderSpeakerIcon from "@/assets/svgs/reminder";
import CustomSwitch from "@/components/AppSwitch";

const CreateMovieNight = () => {
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
            <ThemedText style={{ color: "#373D51" }}>Movie Night</ThemedText>
          </View>

          <View
            style={{
              marginBottom: Size.calcHeight(20),
              width: "100%",
              justifyContent: "space-between",
              flex: 1,
              paddingHorizontal: Size.calcWidth(22),
            }}
          >
            <View
              style={{
                width: "100%",
              }}
            >
              <ThemeInput
                style={styles.input}
                placeholder="Enter movie title"
                lightColor="white"
                darkColor="white"
              />

              <View style={[styles.reminder]}>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 80,
                    width: Size.calcWidth(44),
                    height: Size.calcHeight(44),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F700F60D",
                  }}
                >
                  <ReminderSpeakerIcon />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#373D51",
                    }}
                  >
                    Reminder
                  </Text>
                  <Text
                    style={{
                      fontSize: Size.calcWidth(14),
                      color: "#9CA0AF",
                      fontWeight: "500",
                    }}
                  >
                    Push notifications and email
                  </Text>
                </View>

                <CustomSwitch value={false} onValueChange={() => {}} />
              </View>
            </View>

            <AppButton title="Save" />
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default CreateMovieNight;

const styles = StyleSheet.create({
  statusBarBackground: {
    height: StatusBar.currentHeight || 44,
    backgroundColor: "#AF8BEA",
  },

  input: {
    marginBottom: Size.calcHeight(12),
  },

  container: {
    flex: 1,
    backgroundColor: "#AF8BEA",
    paddingTop:
      Platform.OS === "android"
        ? Size.calcHeight(StatusBar.currentHeight || 50)
        : Size.calcHeight(20),
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    width: "100%",
  },

  wrapper: {
    flex: 1,
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    // padding: Size.calcAverage(20),
    width: "100%",
    alignItems: "center",
  },

  groupCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Size.calcWidth(8),
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    paddingTop: Size.calcHeight(17),
    paddingBottom: Size.calcHeight(14),
    backgroundColor: "#F9F9F9",
    paddingHorizontal: Size.calcWidth(17),
    width: "100%",
    marginBottom: Size.calcHeight(50),
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
    backgroundColor: "rgba(175, 139, 234, 0.1)",
    borderRadius: Size.calcWidth(10),
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    marginBottom: Size.calcHeight(20),
  },

  reminder: {
    backgroundColor: "#F4F4F6",
    padding: Size.calcWidth(15),
    borderRadius: Size.calcWidth(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Size.calcWidth(10),
  },
});
