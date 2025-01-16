import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MovieIcon from "@/assets/svgs/movieicon";
import GamesIcon from "@/assets/svgs/games";
import WineGlass from "@/assets/svgs/wineglass";
import ChitChatIcon from "@/assets/svgs/chitchat";
import HeartIcon from "@/assets/svgs/heart";
import ConfettiIcon from "@/assets/svgs/confetti";
import LavenderIcon from "@/assets/svgs/lavender";
import HeartBubble from "@/assets/svgs/heartbubble";

const ExplorePage = () => {
  const { height } = useWindowDimensions();

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
          <ThemedView style={styles.underlay}>
            <ThemedView style={[styles.overlay, { height: height * 0.85 }]}>
              <ThemedView style={styles.exploreheader}>
                <ThemedText style={styles.title}>Explore</ThemedText>
              </ThemedView>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.featuresWrapper}>
                  {exploreFeatures.map((feature) => (
                    <Pressable key={feature.id}>
                      <ThemedView
                        style={[
                          styles.feature,
                          { backgroundColor: feature.color },
                        ]}
                      >
                        <View>
                          <feature.icon />
                        </View>
                        <ThemedText darkColor="#FFFFFF" style={styles.featuretext}>
                          {feature.title}
                        </ThemedText>
                      </ThemedView>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default ExplorePage;

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
    paddingTop: Size.calcAverage(20),
    width: "100%",
    backgroundColor: "#AF8BEA",
    alignItems: "center",
  },

  title: {
    fontSize: Size.calcWidth(20),
    fontWeight: "semibold",
    textAlign: "left",
    color: "#373D51",
  },

  underlay: {
    backgroundColor: "#E0DAF2",
    flex: 1,
    paddingHorizontal: Size.calcAverage(12),
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    width: "100%",
  },

  overlay: {
    backgroundColor: "white",
    width: "100%",
    gap: Size.calcHeight(26),
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    borderBottomLeftRadius: Size.calcWidth(30),
    borderBottomRightRadius: Size.calcWidth(30),
  },

  exploreheader: {
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    backgroundColor: "#F9F9F9",
    padding: Size.calcAverage(20),
  },

  feature: {
    alignItems: "center",
    justifyContent: "center",
    gap: Size.calcWidth(10),
    width: Size.calcWidth(142),
    height: Size.calcHeight(133),
    borderRadius: Size.calcWidth(10),
    padding: Size.calcWidth(10),
    marginBottom: Size.calcHeight(10),
  },

  featuretext: {
    fontSize: Size.calcWidth(14),
    fontWeight: "semibold",
  },

  scrollContent: {
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(20),
  },

  featuresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Size.calcWidth(28),
  },
});

const exploreFeatures = [
  {
    id: 1,
    title: "Movie Night",
    icon: MovieIcon,
    color: "#0CBCF233",
  },
  {
    id: 2,
    title: "Games",
    icon: GamesIcon,
    color: "#F700F633",
  },
  {
    id: 3,
    title: "Date Night",
    icon: WineGlass,
    color: "#0911E133",
  },
  {
    id: 4,
    title: "Chit Chat",
    icon: ChitChatIcon,
    color: "#F6BB4233",
  },

  {
    id: 5,
    title: "Intimacy",
    icon: HeartIcon,
    color: "#E1160933",
  },

  {
    id: 6,
    title: "Celebration",
    icon: ConfettiIcon,
    color: "#AF8BEA33",
  },

  {
    id: 7,
    title: " Love Language",
    icon: HeartBubble,
    color: "#33AB3F33",
  },

  {
    id: 8,
    title: "Lavender",
    icon: LavenderIcon,
    color: "#592E8333",
  },
];
