import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { showToastable } from "react-native-toastable";

import { useMutation } from "@tanstack/react-query";

import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import CompleteLogo from "@/assets/svgs/CompleteLogo";
import ThemeInput from "@/components/ThemedInput";
import GoogleIcon from "@/assets/svgs/GoogleIcon";
import { IRegisterPayload } from "@/utils/interfaces/auth.interfaces";
import { UserLogin } from "@/utils/apis/auth";

const GOOGLE_CLIENT_ID =
  "376135191242-3fg6tssgfdornf1r1uslv8c95t6fhlf4.apps.googleusercontent.com";
// "831387738180-2cr7vli0gfl9bea2m0au3ieqe3ti80mq.apps.googleusercontent.com"; //majeed

const IOS_ID =
  "376135191242-lj22n8sbh83281b7dp3ojo4oc84o4v4m.apps.googleusercontent.com";

const LoginScreen = (): JSX.Element => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    data,
    isPending,
    mutate: handleRegisterMutate,
  } = useMutation({
    mutationFn: (payload: IRegisterPayload) => UserLogin(payload),

    onSuccess: (data) => {
      console.log({ data });
      setPassword("");

      setEmail("");
    },

    onError: (error: any) => {
      console.log({ error });
      if (error.metrics.hasOwnProperty("accountVerified")) {
        router.push({
          pathname: "/VerifyEmailScreen",
          params: { email },
        });
      } else {
        showToastable({
          message: error.error || "something went wrong",
          status: "success",
        });
      }
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
        scheme: "lavenderlane",
      }),
      scopes: ["profile", "email"],
      responseType: ResponseType.Code,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      // Exchange the code for an access token
      exchangeCodeAsync(
        {
          code,
          clientId: IOS_ID,
          redirectUri: makeRedirectUri({
            scheme: "lavenderlane",
          }),
        },
        discovery
      )
        .then((tokenResponse) => {
          console.log("Access Token:", tokenResponse.accessToken);

          // Fetch user info
          fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
          })
            .then((res) => res.json())
            .then((user) => {
              // Alert.alert("Welcome", `Hello, ${user.name}!`);
              console.log("User Info:", user);
            })
            .catch((err) => console.error("Failed to fetch user info:", err));
        })
        .catch((err) => console.error("Token exchange failed:", err));
    }
  }, [response]);

  const handleLogin = async () => {
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
        Login
      </ThemedText>
      <View style={{ marginBottom: Size.calcHeight(20), width: "100%" }}>
        <ThemeInput
          style={styles.input}
          placeholder="Enter your email address"
          lightColor="white"
          darkColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <ThemeInput
          style={styles.input}
          placeholder="Enter your password"
          lightColor="white"
          darkColor="white"
          value={password}
          onChangeText={setPassword}
          isPassword
        />
      </View>
      <AppButton
        title="Login"
        onPress={handleLogin}
        loading={isPending}
        disabled={!email || !password}
      />
      <ThemedText style={styles.or}>Or</ThemedText>
      <AppButton
        icon={<GoogleIcon />}
        title="Login with Google"
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      />
      <TouchableOpacity
        style={{ marginTop: Size.calcHeight(20), flexDirection: "row" }}
        onPress={() => router.push("/RegisterScreen")}
      >
        <Text style={styles.texts}>Don't have an account?</Text>
        <Text
          style={[
            styles.texts,
            { color: "#592E83", marginLeft: Size.calcWidth(7) },
          ]}
        >
          Register
        </Text>
      </TouchableOpacity>
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
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
  },

  input: {
    marginBottom: Size.calcHeight(12),
  },
});

export default LoginScreen;
