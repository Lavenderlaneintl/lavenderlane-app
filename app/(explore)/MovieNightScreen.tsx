import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { router } from "expo-router";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "@/components/ThemedText";
import ThemeInput from "@/components/ThemedInput";
import AppButton from "@/components/AppButton";
import ReminderSpeakerIcon from "@/assets/svgs/reminder";
import CustomSwitch from "@/components/AppSwitch";
import { customBackgrounds } from "@/utils/data";
import CheckedIcon from "@/assets/svgs/checked";
import UncheckedIcon from "@/assets/svgs/unchecked";
import PlusIcon from "@/assets/svgs/plusicon";
import { useMutation } from "@tanstack/react-query";
import { CreateEvent } from "@/utils/apis/events";
import { showToastable } from "react-native-toastable";
import { useUserStore } from "@/utils/store/userStore";

const MovieNightScreen = () => {
  const [selectedBackground, setSelectedBackground] = useState<number | null>(
    null
  );

  const [backgrounds, setCustomBackgrounds] = useState(customBackgrounds);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [reminder, setReminder] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    background: "",
  });

  const { user, spouse } = useUserStore();

  const [selectedDate, setSelectedDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const { mutate, isPending } = useMutation({
    mutationFn: CreateEvent,

    onSuccess: () => {
      showToastable({
        message: "Movie night event created!",
        status: "success",
      });
      router.push("/DashboardScreen");
    },

    onError: (error: any) => {
      console.log({ error });
    },
  });

  const validateInputs = () => {
    const newErrors = {
      title: "",
      date: "",
      time: "",
      location: "",
      background: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "Movie title is required.";
      isValid = false;
    }

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    if (!selectedTime) {
      newErrors.time = "Time is required.";
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = "Location is required.";
      isValid = false;
    }

    if (selectedBackground === null) {
      newErrors.background = "Please select a background.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    if (user && spouse) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("createdByUserId", user?.id);
      formData.append("partnerId", spouse?.id);
      formData.append("date", selectedDate);
      formData.append("time", selectedTime);
      formData.append("eventType", "movieNight");

      formData.append("location", location);
      formData.append("reminder", reminder.toString());

      if (formData) {
        mutate({ payload: formData });
      }
    }
  };

  const handleAddImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = {
        id: customBackgrounds.length + 1,
        background: result.assets[0].uri,
      };
      const updatedBackgrounds = backgrounds.filter((item) => !item.isButton);
      setCustomBackgrounds([...updatedBackgrounds, newImage]);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleConfirmTime = (time: Date): void => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                width: "100%",
                gap: Size.calcWidth(18),
                paddingBottom: Size.calcHeight(80),
              }}
            >
              <View>
                <ThemedText style={styles.label}>Movie Title</ThemedText>

                <ThemeInput
                  style={styles.input}
                  placeholder="Enter movie title"
                  onChangeText={setTitle}
                  lightColor="white"
                  darkColor="white"
                  value={title}
                  errorText={errors.title}
                />
              </View>

              <View>
                <ThemedText style={styles.label}>Date</ThemedText>

                <TouchableOpacity onPress={showDatePicker}>
                  <ThemeInput
                    style={styles.input}
                    value={selectedDate}
                    placeholder="Select date"
                    lightColor="white"
                    rightIcon={
                      <Ionicons
                        name="chevron-down-outline"
                        size={20}
                        color="#9CA0AF"
                      />
                    }
                    darkColor="white"
                    editable={false}
                  />
                </TouchableOpacity>

                {errors.date && (
                  <ThemedText style={styles.errorText} type="default">
                    {errors.date}
                  </ThemedText>
                )}

                {isDatePickerVisible && (
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    display="calendar"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                )}
              </View>

              <View>
                <ThemedText style={styles.label}>Time</ThemedText>

                <TouchableOpacity onPress={showTimePicker}>
                  <ThemeInput
                    style={styles.input}
                    value={selectedTime}
                    placeholder="Select time"
                    lightColor="white"
                    rightIcon={
                      <Ionicons
                        name="chevron-down-outline"
                        size={20}
                        color="#9CA0AF"
                      />
                    }
                    darkColor="white"
                    editable={false}
                  />
                </TouchableOpacity>

                {errors.time && (
                  <ThemedText style={styles.errorText} type="default">
                    {errors.time}
                  </ThemedText>
                )}

                {isTimePickerVisible && (
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    display="inline"
                    onConfirm={handleConfirmTime}
                    onCancel={hideTimePicker}
                  />
                )}
              </View>

              <View>
                <ThemedText style={styles.label}>Location</ThemedText>

                <ThemeInput
                  style={styles.input}
                  onChangeText={setLocation}
                  placeholder="Enter desired location"
                  lightColor="white"
                  errorText={errors.location}
                  darkColor="white"
                />
              </View>

              <View>
                <ThemedText style={styles.label}>Add Background</ThemedText>

                <FlatList
                  numColumns={3}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id.toString()}
                  data={backgrounds}
                  ItemSeparatorComponent={() => (
                    <View style={{ height: Size.calcHeight(9) }} />
                  )}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  renderItem={({ item }) => {
                    if (item.isButton) {
                      return (
                        <TouchableOpacity
                          onPress={handleAddImage}
                          style={styles.addBackgroundBtn}
                        >
                          <PlusIcon />
                        </TouchableOpacity>
                      );
                    }

                    const source =
                      typeof item.background === "string"
                        ? { uri: item.background }
                        : item.background;

                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedBackground(item.id as number)}
                      >
                        <ImageBackground
                          style={styles.background}
                          source={source}
                        >
                          {selectedBackground === item.id ? (
                            <CheckedIcon />
                          ) : (
                            <UncheckedIcon />
                          )}
                        </ImageBackground>
                      </TouchableOpacity>
                    );
                  }}
                />

                {errors.background && (
                  <ThemedText style={styles.errorText} type="default">
                    {errors.background}
                  </ThemedText>
                )}
              </View>

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

                <CustomSwitch
                  value={reminder}
                  onValueChange={() => setReminder(!reminder)}
                />
              </View>
            </ScrollView>

            <View style={{ marginTop: Size.calcHeight(20) }}>
              <AppButton
                loading={isPending}
                onPress={handleSubmit}
                title="Save"
              />
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default MovieNightScreen;

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

  background: {
    width: Size.calcWidth(106),
    height: Size.calcHeight(63),
    borderRadius: Size.calcWidth(16),
    overflow: "hidden",
    padding: Size.calcWidth(6),
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  addBackgroundBtn: {
    borderColor: "#EDEDED",
    width: Size.calcWidth(106),
    height: Size.calcHeight(63),
    borderWidth: 1,
    borderRadius: Size.calcWidth(16),
    padding: Size.calcWidth(6),
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: Size.calcWidth(16),
    fontWeight: "500",
    marginBottom: Size.calcHeight(12),
  },

  errorText: {
    color: "red",
    fontSize: Size.calcAverage(16),
    fontWeight: "500",
  },
});
