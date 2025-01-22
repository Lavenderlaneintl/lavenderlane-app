import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { exploreFeatures } from "@/utils/data";
import { router } from "expo-router";

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

              <FlatList
                contentContainerStyle={styles.scrollContent}
                numColumns={2}
                data={exploreFeatures}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => router.push("/(explore)/love-language")}
                  >
                    <ThemedView
                      style={[styles.feature, { backgroundColor: item.color }]}
                    >
                      <Image
                        source={item.icon}
                        style={styles.icon}
                        resizeMode="contain"
                      />

                      <ThemedText style={styles.featuretext}>
                        {item.title}
                      </ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: Size.calcHeight(28) }} />
                )}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                showsVerticalScrollIndicator={false}
              />
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

  icon: {
    width: Size.calcWidth(36),
    height: Size.calcHeight(36),
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
    color: "#222B45",
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
