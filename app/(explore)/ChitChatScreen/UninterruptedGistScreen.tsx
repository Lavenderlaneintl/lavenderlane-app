import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { io } from "socket.io-client";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { useUserStore } from "@/utils/store/userStore";
import {
  ConversationTypeEnum,
  IMessage,
  MessageTypeEnum,
} from "@/utils/interfaces/message.interfaces";

const UninterruptedGistScreen = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const cardColor = useThemeColor({ colorName: "card" });
  const socket = useRef<any>(null);
  const { authData, user } = useUserStore();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Initialize socket connection
  useEffect(() => {
    socket.current = io("https://lavenderlaneint.onrender.com", {
      query: {
        token: authData?.token ?? "",
      },
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket.current) return;

    const handleIncomingMessage = (message: IMessage) => {
      const newMessage: IMessage = {
        ...message,
        id: Date.now().toString(),
        isSender: false,
      };
      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    };

    socket.current.on("sendMessage", handleIncomingMessage);

    return () => {
      socket.current?.off("sendMessage", handleIncomingMessage);
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (input.trim().length === 0) return;

    const payload = {
      message: input,
      conversationType: ConversationTypeEnum.Direct,
      coupleId: user?.coupleId ?? "",
      partnerId: user?.syncedWith ?? "",
      senderId: authData?.id ?? "",
      type: MessageTypeEnum.Text,
    };

    const newMessage: IMessage = {
      ...payload,
      id: Date.now().toString(),
      isSender: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Send message through socket
    if (socket.current) {
      console.log({ payload });

      socket.current.emit("sendMessage", payload);
    }

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
              <ThemedText style={styles.headerTitle}>
                Uninterrupted Gist
              </ThemedText>
            </ThemedView>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: IMessage }) => (
            <View
              style={[
                styles.messageBubble,
                item.isSender
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
                  item.isSender && colorScheme === "light"
                    ? { color: "#fff" }
                    : {}
                }
              >
                {item.message}
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

export default UninterruptedGistScreen;

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
