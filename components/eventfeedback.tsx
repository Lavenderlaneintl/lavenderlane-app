import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "./ThemedText";
import { EventsData } from "@/utils/interfaces/event.interfaces";
import AppButton from "./AppButton";
import { router } from "expo-router";

const EventFeedbackCard: React.FC<EventsData> = ({
  title,
  date,
  time,
  id,
  eventType,
}) => {
  return (
    <ThemedView style={styles.card} darkColor="#E1E2E533" lightColor="#F2EEFE">
      <View style={styles.movieEventHeader}>
        <View>
          <ThemedText
            style={{ fontWeight: 500, fontSize: Size.calcWidth(14) }}
            lightColor="#9CA0AF"
          >
            {title}
          </ThemedText>
          <ThemedText style={{ fontWeight: 600, fontSize: Size.calcWidth(14) }}>
            {date} | {time}
          </ThemedText>
        </View>

        {eventType === "movieNight" ? (
          <Image
            source={require("@/assets/images/movies-popcorn.png")}
            resizeMode="cover"
            style={{ width: 44, height: 44 }}
          />
        ) : (
          <Image
            source={require("@/assets/images/wine-cup.png")}
            resizeMode="cover"
            style={{ width: 44, height: 44 }}
          />
        )}
      </View>

      <View style={styles.pill}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Size.calcWidth(14),
          }}
        >
          {eventType === "movieNight" ? (
            <Image
              source={require("@/assets/images/movies-popcorn.png")}
              resizeMode="cover"
              style={{ width: 44, height: 44 }}
            />
          ) : (
            <Image
              source={require("@/assets/images/wine-cup.png")}
              resizeMode="cover"
              style={{ width: 44, height: 44 }}
            />
          )}

          <ThemedText
            numberOfLines={2}
            style={{
              fontWeight: 600,
              maxWidth: 234,
              fontSize: Size.calcWidth(16),
            }}
          >
            How was the {eventType === "movieNight" ? "movie" : "date"} night
            with babe?
          </ThemedText>
        </View>

        <AppButton
          onPress={() =>
            router.push({
              pathname: "/EventFeedBack",
              params: { eventType, id },
            })
          }
          style={{ borderRadius: Size.calcWidth(8) }}
          title="Respond"
        />
      </View>
    </ThemedView>
  );
};

export default EventFeedbackCard;

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
    backgroundColor: "#0CBCF20D",
    padding: Size.calcWidth(12),
    borderRadius: Size.calcWidth(12),
    borderWidth: 0.8,
    borderColor: "white",
    gap: Size.calcHeight(12),
  },
});
