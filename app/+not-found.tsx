import React from "react";
import { StyleSheet, Image } from "react-native";
import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <ThemedView style={styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/564/564619.png",
          }}
          style={styles.image}
        />
        <ThemedText type="title" style={styles.title}>
          Oops! This screen doesn't exist.
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          The page you’re looking for might have been removed or temporarily
          unavailable.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Return to Home</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  link: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
});
