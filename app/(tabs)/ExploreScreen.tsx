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
      <ThemedView style={[styles.overlay, { height: height * 0.85 }]}>
        <ThemedView lightColor="#F9F9F9" style={styles.exploreheader}>
          <ThemedText type="title" style={styles.title}>Explore</ThemedText>
        </ThemedView>

        <FlatList
          contentContainerStyle={styles.scrollContent}
          numColumns={2}
          data={exploreFeatures}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(item.route as any)} //modifying this assertion
            >
              <ThemedView
                style={[styles.feature, { backgroundColor: item.color }]}
              >
                <Image
                  source={item.icon}
                  style={styles.icon}
                  resizeMode="contain"
                />

                <ThemedText style={styles.featuretext}>{item.title}</ThemedText>
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
    </>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  title: {
    fontSize: Size.calcWidth(20),
    fontWeight: "semibold",
    textAlign: "left",
  },

  overlay: {
    width: "100%",
    gap: Size.calcHeight(26),
    borderTopLeftRadius: Size.calcWidth(24),
    borderTopRightRadius: Size.calcWidth(24),
    borderBottomLeftRadius: Size.calcWidth(24),
    borderBottomRightRadius: Size.calcWidth(24),
  },

  exploreheader: {
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
  },

  scrollContent: {
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(150),
  },

  featuresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Size.calcWidth(28),
  },
});
