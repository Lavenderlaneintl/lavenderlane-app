import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedText } from "@/components/ThemedText";
import NumberPad from "@/components/NumberPad";
import OTPInput from "@/components/OTPInput";
import { Ionicons } from "@expo/vector-icons";

const NewSecretFlirtMessageCode = (): JSX.Element => {
  const pinLength = 4;
  const router = useRouter();

  const [pin, setPin] = useState<number[]>([]);

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
          <ThemedView
            lightColor="#F9F9F9"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>

            <Image
              style={{
                width: Size.calcWidth(37),
                height: Size.calcHeight(35),
              }}
              source={require("@/assets/images/heart-padlock.png")}
            />
          </ThemedView>

          <ThemedText
            type="title"
            style={{
              marginTop: Size.calcHeight(30),
              fontSize: Size.calcWidth(24),
              fontWeight: "600",
            }}
          >
            New secret passcode
          </ThemedText>
          <ThemedText style={styles.note}>
            Kindly enter your new secret passcode
          </ThemedText>

          <OTPInput
            pin={pin}
            pinLength={pinLength}
            onPinChange={handlePinChange}
          />

          <TouchableOpacity style={styles.resend}>
            <ThemedText>
              Resend code in <Text style={{ color: "#592E83" }}>00:33</Text>
            </ThemedText>
          </TouchableOpacity>
          <NumberPad
            onDeletePress={handleDelete}
            onNumberPress={handleKeyPress}
          />
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default NewSecretFlirtMessageCode;

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
