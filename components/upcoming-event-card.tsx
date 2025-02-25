import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "./ThemedText";
import { EventsData } from "@/utils/interfaces/event.interfaces";

const UpcomingEventCard: React.FC<EventsData> = ({
  title,
  date,
  time,
  location,
}) => {
  return (
    <ThemedView style={styles.card} darkColor="#E1E2E533" lightColor="#F2EEFE">
      <View style={styles.movieEventHeader}>
        <View>
          <ThemedText
            style={{ fontWeight: 500, fontSize: Size.calcWidth(14) }}
            lightColor="#9CA0AF"
          >
            Movie Title
          </ThemedText>
          <ThemedText style={{ fontWeight: 600, fontSize: Size.calcWidth(18) }}>
            {title}
          </ThemedText>
        </View>

        <Image
          source={require("@/assets/images/movies-popcorn.png")}
          resizeMode="cover"
          style={{ width: 44, height: 44 }}
        />
      </View>

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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {date} | {time}
          </Text>
        </View>

        <View style={styles.pill}>
          <Text style={styles.pillText}>{location}</Text>
        </View>
      </View>
    </ThemedView>
  );
};

export default UpcomingEventCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: Size.calcWidth(20),
    padding: Size.calcWidth(10),
    gap: Size.calcHeight(12),
  },

  movieEventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
