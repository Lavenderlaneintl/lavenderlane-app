import React, { useEffect, useState } from "react";
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

const FlirtMessageSecretCode = (): JSX.Element => {
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

  useEffect(() => {
    if (pin.length === pinLength) {
      router.push("/(settings)/newSecretFlirtMessageCode");
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ThemedText
              style={{ fontSize: Size.calcWidth(20), fontWeight: "500" }}
              type="title"
            >
              Flirt Messages
            </ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-circle" size={36} color={`#592E83`} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              gap: Size.calcWidth(28),
              marginTop: Size.calcHeight(30),
            }}
          >
            <Image
              style={{
                width: Size.calcWidth(100),
                height: Size.calcHeight(92),
              }}
              source={require("@/assets/images/heart-padlock.png")}
            />

            <ThemedText
              type="title"
              style={{
                textAlign: "center",
                fontSize: Size.calcWidth(24),
                fontWeight: "600",
                maxWidth: 252,
              }}
            >
              Enter your current secret passcode
            </ThemedText>
          </View>

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

export default FlirtMessageSecretCode;

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
