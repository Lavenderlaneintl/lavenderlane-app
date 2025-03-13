import React, { useState } from "react";
import {
  FlatList,
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
import { router, useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

import AppButton from "@/components/AppButton";

import ThemeInput from "@/components/ThemedInput";
import ThemedTextarea from "@/components/ThemedTextArea";
import emojiRegex from "emoji-regex";
import { useMutation } from "@tanstack/react-query";
import { CreateFeedback } from "@/utils/apis/events";
import { showToastable } from "react-native-toastable";

const EventFeedBack = (): JSX.Element => {
  const eventType = useLocalSearchParams().eventType as
    | "movieNight"
    | "dateNight";

  const id = useLocalSearchParams().id as string;

  const text = "🙂😍😡😉😎";
  const regex = emojiRegex();
  const emojis = text.match(regex) || [];

  const [emoji, setEmoji] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ emoji: "", comment: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateFeedback,

    onSuccess: () => {
      showToastable({
        message: "Feedback created successfully!",
        status: "success",
      });
      router.push("/DashboardScreen");
    },

    onError: (error: any) => {
      console.log({ error });
    },
  });

  const validateInputs = () => {
    let newErrors = { emoji: "", comment: "" };
    let isValid = true;

    if (!emoji) {
      newErrors.emoji = "Please select an emoji.";
      isValid = false;
    }

    if (comment.trim().length === 0) {
      newErrors.comment = "Comment cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    mutate({ payload: { emoji, comment }, id });
  };

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
          </View>

          <View
            style={[
              {
                gap: Size.calcHeight(25),
                flex: 1,
                marginTop: Size.calcHeight(40),
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{ gap: Size.calcHeight(40)}}>
              <View style={{ gap: Size.calcHeight(27), alignItems: "center" }}>
                {eventType === "movieNight" ? (
                  <Image
                    source={require("@/assets/images/movie-night-review.png")}
                    style={{
                      width: Size.calcWidth(100),
                      height: Size.calcWidth(100),
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/date-night-review.png")}
                    style={{
                      width: Size.calcWidth(100),
                      height: Size.calcWidth(100),
                    }}
                    resizeMode="cover"
                  />
                )}

                <ThemedText
                  type="title"
                  style={{
                    fontWeight: "600",
                    fontSize: Size.calcWidth(24),
                    textAlign: "center",
                  }}
                >
                  How was the {eventType === "movieNight" ? "movie" : "date"}{" "}
                  night with babe?
                </ThemedText>
              </View>

              <View style={{ width: "100%", gap: Size.calcWidth(16) }}>
                <View style={{ alignItems: "center" }}>
                  <FlatList
                    data={emojis}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 18 }} />
                    )}
                    contentContainerStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setEmoji(item);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            emoji: "",
                          }));
                        }}
                        style={[
                          styles.emojiBtn,
                          emoji === item && { backgroundColor: "#AF8BEA" },
                        ]}
                      >
                        <ThemedText>{item}</ThemedText>
                      </TouchableOpacity>
                    )}
                  />

                  {errors.emoji ? (
                    <ThemedText style={styles.errorText}>
                      {errors.emoji}
                    </ThemedText>
                  ) : null}
                </View>

                <ThemedTextarea
                  errorText={errors.comment}
                  value={comment}
                  onChangeText={setComment}
                  label="Other Comment"
                  placeholder="Start typing..."
                />
              </View>
            </View>

            <AppButton
              loading={isPending}
              title="Done"
              onPress={handleSubmit}
              disabled={!emoji || comment.trim().length === 0}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default EventFeedBack;

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

  emojiBtn: {
    width: Size.calcWidth(48),
    height: Size.calcWidth(48),
    borderRadius: Size.calcWidth(30),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#DFDFDF",
    borderWidth: 0.8,
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

  errorText: {
    marginTop: Size.calcHeight(5),
    color: "red",
    fontSize: Size.calcAverage(14),
    fontWeight: "500",
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
