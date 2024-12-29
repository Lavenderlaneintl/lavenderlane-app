import React from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { ThemedView } from "@/components/ThemedView";
import CompleteLogo from "@/assets/svgs/CompleteLogo";
import ThemeInput from "@/components/ThemedInput";
import GoogleIcon from "@/assets/svgs/GoogleIcon";

const RegisterScreen = (): JSX.Element => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/register.png")}
      style={styles.backgroundImage}
    >
      <CompleteLogo />
      <ThemedText style={[styles.texts, { marginTop: Size.calcHeight(40) }]}>
        Create an account and get started
      </ThemedText>
      <View style={{ marginBottom: Size.calcHeight(20), width: "100%" }}>
        <ThemeInput
          style={styles.input}
          placeholder="Enter your email address"
          lightColor="white"
          darkColor="white"
        />
        <ThemeInput
          style={styles.input}
          placeholder="Enter your password"
          lightColor="white"
          darkColor="white"
        />
      </View>
      <AppButton title="Continue" />
      <ThemedText style={styles.or}>Or</ThemedText>
      <AppButton
        icon={<GoogleIcon />}
        title="Sign up with Google"
        onPress={() => {
          // router.replace("/home");
        }}
        style={styles.googleButton}
      />
      <TouchableOpacity
        style={{ marginTop: Size.calcHeight(20), flexDirection: "row" }}
      >
        <Text style={styles.texts}>Already have an account?</Text>
        <Text
          style={[
            styles.texts,
            { color: "#592E83", marginLeft: Size.calcWidth(7) },
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>

      <Text style={[styles.texts, { marginTop: Size.calcHeight(20) }]}>
        By Signing up , you agree to our Terms of Service and Privacy Policy
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(40),
    alignItems: "center",
  },

  texts: {
    fontSize: Size.calcWidth(18),
    textAlign: "center",
    color: "#9CA0AF",
  },

  or: {
    fontSize: Size.calcWidth(14),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: Size.calcHeight(20),
    marginTop: Size.calcHeight(10),
  },

  googleButton: {
    backgroundColor: "rgba(225, 226, 229, 0.2)",
  },

  input: {
    marginBottom: Size.calcHeight(12),
  },
});

export default RegisterScreen;
