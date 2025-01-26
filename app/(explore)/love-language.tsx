import React from "react";
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
import HeartBubble from "@/assets/svgs/heartbubble";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import { loveLanguages } from "@/utils/data";
import AppButton from "@/components/AppButton";
import PlusIcon from "@/assets/svgs/plusicon";

const LoveLanguagePage = (): JSX.Element => {
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
          <View style={[{ gap: Size.calcHeight(20) }]}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => router.back()}
              >
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>

              <ThemedView style={styles.header}>
                <HeartBubble />
                <ThemedText style={styles.headerTitle}>
                  Love Language
                </ThemedText>
              </ThemedView>
            </View>

            <ThemedView style={[{ gap: Size.calcHeight(25) }]}>
              <View style={{ gap: Size.calcHeight(6) }}>
                <ThemedText
                  style={{ fontWeight: "600", fontSize: Size.calcWidth(24) }}
                >
                  Choose your love language
                </ThemedText>
                <ThemedText
                  style={{
                    fontWeight: "500",
                    color: "#9CA0AF",
                    fontSize: Size.calcWidth(14),
                  }}
                >
                  You can select more than one
                </ThemedText>
              </View>

              <FlatList
                data={loveLanguages}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => router.push("/(explore)/love-language")}
                  >
                    <ThemedView style={styles.language}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: Size.calcWidth(11),
                        }}
                      >
                        <Image
                          source={item.icon}
                          style={styles.icon}
                          resizeMode="contain"
                        />

                        <ThemedText style={styles.featuretext}>
                          {item.title}
                        </ThemedText>
                      </View>
                    </ThemedView>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: Size.calcHeight(28) }} />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            </ThemedView>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <PlusIcon />
          </TouchableOpacity>

          <AppButton title="Save" disabled />
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default LoveLanguagePage;

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
    justifyContent: "space-between",
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
