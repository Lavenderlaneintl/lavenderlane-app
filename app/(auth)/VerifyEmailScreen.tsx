import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import NumberPad from "@/components/NumberPad";
import OTPInput from "@/components/OTPInput";
import { useMutation } from "@tanstack/react-query";
import { VerifyEmail } from "@/utils/apis/auth";

const VerifyEmailScreen = (): JSX.Element => {
  const pinLength = 6;
  const router = useRouter();

  const email = useLocalSearchParams().email as string;
  const [pin, setPin] = useState<number[]>([]);

  const {
    data,
    isPending: isLoading,
    mutate,
  } = useMutation({
    mutationFn: VerifyEmail,

    onSuccess: (data) => {
      console.log({ data });
      router.replace("/WelcomeScreen");

      setPin([]);
    },

    onError: (error: any) => {
      console.log({ error });
    },
  });

  const handleSubmit = () => {
    console.log({
      email,
      code: pin.join(""),
    });

    mutate({
      email,
      code: pin.join(""),
    });
  };

  const handleKeyPress = (key: number) => {
    if (pin.length < pinLength) {
      setPin((prevPin: number[]) => [...prevPin, key]);
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin((prevPin: number[]) => prevPin.slice(0, -1));
    }
  };

  const handlePinChange = (newPin: number[]) => {
    setPin(newPin);
  };

  useEffect(() => {
    if (pin.length === pinLength) {
      handleSubmit();
    }
  }, [pin]);

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
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={24} color="white" />
          </TouchableOpacity>

          <ActivityIndicator
            style={styles.loader}
            size={Size.calcAverage(30)}
            color="#AF8BEA"
            animating={isLoading}
          />

          <ThemedText type="title" style={{ marginTop: Size.calcHeight(30) }}>
            Check your mail box
          </ThemedText>
          <ThemedText style={styles.note}>
            Kindly enter the 4 digit code sent to your email
          </ThemedText>
          <TouchableOpacity style={styles.resend}>
            <ThemedText>
              Resend code in <Text style={{ color: "#592E83" }}>00:33</Text>
            </ThemedText>
          </TouchableOpacity>
          <OTPInput
            pin={pin}
            pinLength={pinLength}
            onPinChange={handlePinChange}
          />
          <NumberPad
            onDeletePress={handleDelete}
            onNumberPress={handleKeyPress}
          />
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default VerifyEmailScreen;

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

  wrapper: {
    flex: 1,
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
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
});
