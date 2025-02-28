import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { exploreFeatures } from "@/utils/data";
import { router } from "expo-router";
import { useUserStore } from "@/utils/store/userStore";

const ExplorePage = () => {
  const token = useUserStore.getState().authData?.token;

console.log(token)

  return (
    <ThemedView style={styles.overlay}>
      <ThemedView lightColor="#F9F9F9" style={styles.exploreheader}>
        <ThemedText type="title" style={styles.title}>
          Explore
        </ThemedText>
      </ThemedView>

      <FlatList
        contentContainerStyle={styles.scrollContent}
        numColumns={2}
        data={exploreFeatures}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(item.route)}>
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
        columnWrapperStyle={{
          gap: Size.calcWidth(28),
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  title: {
    fontSize: Size.calcAverage(30),
    fontWeight: "semibold",
    textAlign: "left",
  },

  overlay: {
    width: "100%",
    borderTopLeftRadius: Size.calcAverage(24),
    borderTopRightRadius: Size.calcAverage(24),
    borderBottomLeftRadius: Size.calcAverage(24),
    borderBottomRightRadius: Size.calcAverage(24),
  },

  exploreheader: {
    paddingVertical: Size.calcHeight(20),
    paddingHorizontal: Size.calcWidth(25),
  },

  icon: {
    width: Size.calcWidth(36),
    height: Size.calcHeight(36),
  },

  feature: {
    alignItems: "center",
    justifyContent: "center",
    gap: Size.calcWidth(10),
    width: Size.calcWidth(155),
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
