import React, { useState, useRef, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  useColorScheme,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";

const FlirtMessagesScreen = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const cardColor = useThemeColor({ colorName: "card" });

  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! Babe", sender: "me" },
    { id: "2", text: "Hi Love, How’re you doing?", sender: "other" },
    { id: "3", text: "Really nice having you here", sender: "me" },
    { id: "4", text: "Yh, me too", sender: "other" },
    { id: "5", text: "Want to show you something", sender: "me" },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = useCallback(() => {
    if (input.trim().length === 0) return;

    const newMessage = { id: Date.now().toString(), text: input, sender: "me" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInput("");
    Keyboard.dismiss();

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [input]);

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
            <ThemedView style={styles.headerTitleContainer}>
              <ThemedText style={styles.headerTitle}>Sensitive Talk</ThemedText>
            </ThemedView>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "me"
                  ? styles.myMessage
                  : {
                      alignSelf: "flex-start",
                      backgroundColor: cardColor,
                    },
              ]}
            >
              <ThemedText
                lightColor="#373D51"
                style={
                  item.sender === "me" && colorScheme === "light"
                    ? { color: "#fff" }
                    : {}
                }
              >
                {item.text}
              </ThemedText>
            </View>
          )}
        />

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: colorScheme === "light" ? "#EEFAF8" : "#333",
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colorScheme === "light" ? "#F5F5F5" : "#444",
                color: colorScheme === "light" ? "#000" : "#FFF",
              },
            ]}
            placeholder="Write your message"
            placeholderTextColor={colorScheme === "light" ? "#999" : "#CCC"}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default FlirtMessagesScreen;

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

  headerTitle: {
    fontSize: Size.calcWidth(18),
    fontWeight: "500",
    textAlign: "left",
  },

  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },

  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#592E83",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    paddingVertical: Size.calcHeight(15),
  },

  input: {
    flex: 1,
    height: Size.calcHeight(45),
    paddingHorizontal: Size.calcWidth(15),
    borderRadius: Size.calcAverage(20),
    backgroundColor: "#F5F5F5",
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#592E83",
    borderRadius: 20,
    padding: 10,
  },
});
