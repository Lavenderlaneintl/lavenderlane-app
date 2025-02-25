import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "./ThemedText";
import { EventsData } from "@/utils/interfaces/event.interfaces";

const UpcomingDateNightCard: React.FC<EventsData> = ({
  time,
  title,
  location,
  date,
}) => {
  return (
    <ThemedView style={styles.card} darkColor="#E1E2E533" lightColor="#F2EEFE">
      <ImageBackground
        resizeMode="cover"
        style={{
          width: "100%",
          height: Size.calcHeight(125),
          borderRadius: Size.calcWidth(12),
          overflow: "hidden",
        }}
        source={require("@/assets/images/background1.png")}
      />

      <View style={styles.movieEventHeader}>
        <View>
          <ThemedText style={{ fontWeight: 600, fontSize: Size.calcWidth(18) }}>
            {title}
          </ThemedText>
          <ThemedText
            style={{ fontWeight: 500, fontSize: Size.calcWidth(14) }}
            lightColor="#9CA0AF"
          >
            {date} | {time}
          </ThemedText>
        </View>

        <Image
          source={require("@/assets/images/movies-popcorn.png")}
          resizeMode="cover"
          style={{ width: 44, height: 44 }}
        />
      </View>
    </ThemedView>
  );
};

export default UpcomingDateNightCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: Size.calcWidth(20),
    gap: Size.calcHeight(16),
  },

  movieEventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(20),
  },

  pill: {
    backgroundColor: "#FFFFFF",
    padding: Size.calcWidth(12),
    borderRadius: Size.calcWidth(25),
  },

  pillText: {
    fontWeight: 500,
    fontSize: Size.calcWidth(12),
  },
});
