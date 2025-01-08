import React, { useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";

import Size from "@/utils/hooks/useResponsiveSize";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileByEmail } from "@/utils/apis/user";

const WelcomeScreen = (): JSX.Element => {
  const email = useLocalSearchParams().email as string;
  const router = useRouter();

  const [username, setUsername] = useState("");

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: UpdateProfileByEmail,

    onSuccess: (data) => {
      console.log({ data });
      router.push({
        pathname: "/InvitePartnerScreen",
        params: {
          partnerName: username,
        },
      });

      setUsername("");
    },

    onError: (error: any) => {
      console.log({ error });
    },
  });

  const handleNext = () => {
    if (username) {
      mutate({
        email,
        payload: {
          endearment: username,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Half: Image */}
      <View style={styles.topHalf}>
        <Image
          source={require("../../assets/images/sync-img.png")}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      {/* Bottom Half: Gradient */}
      <LinearGradient
        // colors={["#E3C0FF", "#D8B4F8", "#C49DF4"]}
        colors={["#AF8BEA", "#D8B4F8", "#fff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomHalf}
      >
        <Text style={styles.titleText}>
          What do you call your partner? (Nickname)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="rgba(255, 255, 255, 0.2)"
          onChangeText={setUsername}
        />
        <TouchableOpacity
          style={[
            styles.button,
            username
              ? {
                  backgroundColor: "#592E83",
                }
              : {
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                },
          ]}
          onPress={handleNext}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={[
                styles.buttonText,
                username
                  ? {
                      color: "#F9F9F9",
                    }
                  : {
                      color: "#592E83",
                    },
              ]}
            >
              Confirm
            </Text>
          )}
        </TouchableOpacity>
      </LinearGradient>

      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  topHalf: {
    flex: 1,
    overflow: "hidden", // Prevents overflow issues
  },

  image: {
    width: "100%",
    height: 400,
  },

  bottomHalf: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(40),
  },

  titleText: {
    fontSize: Size.calcWidth(24),
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: Size.calcHeight(30),
  },

  input: {
    width: "100%",
    height: Size.calcHeight(80),
    paddingHorizontal: Size.calcWidth(20),
    marginBottom: Size.calcHeight(25),
    fontSize: Size.calcWidth(30),
    color: "#592E83",
  },

  button: {
    width: "100%",
    height: Size.calcHeight(50),
    borderRadius: Size.calcAverage(20),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: Size.calcWidth(16),
    fontWeight: "600",
  },
});
