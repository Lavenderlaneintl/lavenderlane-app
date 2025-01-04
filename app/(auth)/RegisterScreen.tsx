import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Alert,
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
import { useMutation } from "@tanstack/react-query";
import { IRegisterPayload } from "@/utils/interfaces/auth.interfaces";
import { RegisterUser } from "@/utils/apis/auth";
import { showToastable } from "react-native-toastable";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; // Replace this

const RegisterScreen = (): JSX.Element => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    data,
    isPending,
    mutate: handleRegisterMutate,
  } = useMutation({
    mutationFn: (payload: IRegisterPayload) => RegisterUser(payload),

    onSuccess: () => {
      setPassword("");
      setEmailError("");
      router.push({
        pathname: "/VerifyEmailScreen",
        params: { email: "email" },
      });
      setEmail("");
      setPasswordError("");
    },

    onError: (error: any) => {
      console.log({ error });
      showToastable({
        message: error.error || "something went wrong",
        status: "success",
      });
    },
  });

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

  const validateInputs = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;
    handleRegisterMutate({
      email,
      password,
    });
  };

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
          value={email}
          onChangeText={setEmail}
          errorText={emailError}
        />
        <ThemeInput
          style={styles.input}
          placeholder="Enter your password"
          lightColor="white"
          darkColor="white"
          value={password}
          onChangeText={setPassword}
          isPassword
          errorText={passwordError}
        />
      </View>
      <AppButton
        title="Continue"
        onPress={handleRegister}
        loading={isPending}
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
        onPress={() => router.push("/LoginScreen")}
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
