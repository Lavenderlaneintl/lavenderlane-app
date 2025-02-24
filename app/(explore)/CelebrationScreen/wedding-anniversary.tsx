import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import ThemeInput from "@/components/ThemedInput";
import { ThemedTextarea } from "@/components/ThemedTextArea";
import CustomSwitch from "@/components/AppSwitch";
import ReminderSpeakerIcon from "@/assets/svgs/reminder";
import AppButton from "@/components/AppButton";
import { useUserStore } from "@/utils/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { CreateCelebration } from "@/utils/apis/celebration";
import { showToastable } from "react-native-toastable";

const WeddingAnniversaryScreen = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const { authData } = useUserStore();

  const [selectedDate, setSelectedDate] = useState("10-02-2025");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [note, setNote] = useState("");
  const [reminder, setReminder] = useState(false);

  const [errors, setErrors] = useState({
    note: "",
    date: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCelebration,

    onSuccess: () => {
      showToastable({
        message: "Your celebration has been created successfully",
        status: "success",
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

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

  const validateInputs = () => {
    const newErrors = {
      note: "",
      date: "",
    };

    let isValid = true;

    if (!note.trim()) {
      newErrors.note = "Note is required.";
      isValid = false;
    }

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    if (authData) {
      mutate({
        payload: {
          createdBy: authData?.id,
          note,
          date: selectedDate,
          reminder,
          celebrationType: "anniversary",
        },
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.wrapper}>
        <View style={{ gap: Size.calcHeight(20) }}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: "100%",

            justifyContent: "center",
            gap: Size.calcWidth(18),
            paddingBottom: Size.calcHeight(90),
          }}
        >
          <View style={{ gap: Size.calcWidth(8) }}>
            <View style={{ alignItems: "center", gap: Size.calcWidth(12) }}>
              <Image
                source={require("@/assets/images/anniversary.png")}
                resizeMode="cover"
                style={{
                  width: Size.calcWidth(100),
                  height: Size.calcHeight(90),
                }}
              />

              <ThemedText style={styles.title}>
                Add your wedding anniversary date
              </ThemedText>
            </View>

            <View>
              <TouchableOpacity onPress={showDatePicker}>
                <ThemeInput
                  label="Date"
                  value={selectedDate}
                  placeholder="Select date"
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
              <ThemedTextarea
                lightColor="white"
                value={note}
                onChangeText={setNote}
                label="Write a short love note to your partner"
                placeholder="Start typing..."
              />

              {errors.note && (
                <ThemedText style={styles.errorText} type="default">
                  {errors.note}
                </ThemedText>
              )}
            </View>
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

          <AppButton
            onPress={handleSubmit}
            loading={isPending}
            style={{ marginVertical: Size.calcHeight(15) }}
            title="Done"
          />
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
};

export default WeddingAnniversaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AF8BEA",
    paddingTop: Size.calcHeight(
      StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 60
    ),
  },

  wrapper: {
    flex: 1,
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  headerTitleContainer: {
    flex: 1,
  },

  title: {
    fontSize: Size.calcWidth(24),
    fontWeight: "600",
    textAlign: "center",
    maxWidth: Size.calcWidth(251),
    lineHeight: Size.calcHeight(28),
  },

  input: {
    marginBottom: Size.calcHeight(12),
  },

  label: {
    fontSize: Size.calcWidth(16),
    fontWeight: "500",
    marginBottom: Size.calcHeight(12),
  },

  reminder: {
    backgroundColor: "#F4F4F6",
    padding: Size.calcWidth(15),
    marginTop: Size.calcHeight(15),
    borderRadius: Size.calcWidth(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Size.calcWidth(10),
  },

  errorText: {
    color: "red",
    fontSize: Size.calcAverage(16),
    fontWeight: "500",
  },
});
