import React, { useState, useRef, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import {
  IAiMessage,
  IOpenAiMessage,
  OpenAiRoleEnum,
} from "@/utils/interfaces/lavenderAi.interfaces";
import { useUserStore } from "@/utils/store/userStore";
import { formatDate, generateUniqueId, parseDateString } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { fetchOpenAiResponse } from "@/utils/apis/aiChat";

const LavenderAIScreen = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const cardColor = useThemeColor({ colorName: "card" });
  const user = useUserStore((state) => state.user);

  const [messages, setMessages] = useState<IAiMessage[]>([
    {
      id: generateUniqueId(),
      time: parseDateString(new Date().toISOString()),
      message: `Hello ${user?.firstName || ""}! How can I assist you today?`,
      isUser: false,
    },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const {
    data,
    isPending,
    mutate: handleAiResponse,
  } = useMutation({
    mutationFn: (payload: IOpenAiMessage[]) => fetchOpenAiResponse(payload),

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error: any) => {
      console.log({ error });
    },
  });

  const sendMessage = useCallback(() => {
    if (input.trim().length === 0) return;

    const newMessage: IAiMessage = {
      message: input,
      id: generateUniqueId(),
      time: parseDateString(new Date().toISOString()),
      isUser: true,
    };

    // Add user message to local state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    Keyboard.dismiss();

    // Create a "typing..." message for the bot
    const botTypingMessage: IAiMessage = {
      id: generateUniqueId(),
      isUser: false,
      message: "Lavender is typing...",
      time: parseDateString(new Date().toISOString()),
    };

    setMessages((prev) => [...prev, botTypingMessage]);

    // Prepare conversation history, keeping last 10 messages
    const formattedMessages = messages.slice(-100).map((msg) => ({
      role: msg.isUser ? OpenAiRoleEnum.User : OpenAiRoleEnum.Assistant,
      content: msg.message,
    }));

    // Add new user message to history before sending
    formattedMessages.push({ role: OpenAiRoleEnum.User, content: input });

    handleAiResponse(formattedMessages);
  }, [input, messages]);

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
              <ThemedText style={styles.headerTitle}>AI Counselor</ThemedText>
            </ThemedView>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: IAiMessage }) => (
            <View>
              <View
                style={[
                  styles.messageBubble,
                  item.isUser
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
                    item.isUser && colorScheme === "light"
                      ? { color: "#fff" }
                      : {}
                  }
                >
                  {item.message}
                </ThemedText>
              </View>
              <ThemedText
                style={{
                  fontSize: Size.calcAverage(13),
                  textAlign: item.isUser ? "right" : "left",
                  lineHeight: 0,
                }}
              >
                {formatDate(item.time)}
              </ThemedText>
            </View>
          )}
          style={{ paddingTop: Size.calcHeight(15) }}
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

export default LavenderAIScreen;

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
