import React, { useEffect } from "react";
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
import CompleteLogo from "@/assets/svgs/CompleteLogo";
import ThemeInput from "@/components/ThemedInput";
import GoogleIcon from "@/assets/svgs/GoogleIcon";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; // Replace this

const RegisterScreen = (): JSX.Element => {
  const router = useRouter();

  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    revocationEndpoint: "https://oauth2.googleapis.com/revoke",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      redirectUri: makeRedirectUri({
        scheme: "your-app-scheme", // Optional custom scheme
      }),
      scopes: ["profile", "email"],
      responseType: ResponseType.Token,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
        })
        .catch((err) => console.error(err));
    }
  }, [response]);

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
          isPassword
        />
      </View>
      <AppButton
        title="Continue"
        onPress={() => {
          router.replace("/VerifyEmailScreen");
        }}
      />
      <ThemedText style={styles.or}>Or</ThemedText>
      <AppButton
        icon={<GoogleIcon />}
        title="Sign up with Google"
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
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
