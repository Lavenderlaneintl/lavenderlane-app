import React from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Size from "@/utils/hooks/useResponsiveSize";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import { chitchatOptions } from "@/utils/data";
import { useThemeColor } from "@/utils/hooks/useThemeColor";

const ChitChatScreen = (): JSX.Element => {
  const cardColor = useThemeColor({ colorName: "card" });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.wrapper}>
        <View style={[{ gap: Size.calcHeight(20) }]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>

            <ThemedView style={styles.header}>
              <ThemedText style={styles.headerTitle}>Chit-Chat</ThemedText>
            </ThemedView>
          </View>

          <ThemedView
            style={[
              { gap: Size.calcHeight(10), marginTop: Size.calcHeight(20) },
            ]}
          >
            <FlatList
              data={chitchatOptions}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <ThemedView
                    style={[styles.language, { backgroundColor: cardColor }]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: Size.calcWidth(15),
                      }}
                    >
                      <Image
                        source={item.icon}
                        style={styles.icon}
                        resizeMode="contain"
                      />

                      <View>
                        <ThemedText
                          style={[
                            styles.featuretext,
                            { fontSize: Size.calcAverage(19) },
                          ]}
                          lightColor="#373D51"
                        >
                          {item.title}
                        </ThemedText>
                        <ThemedText
                          style={styles.featuretext}
                          lightColor="#373D51"
                        >
                          {item.description}
                        </ThemedText>
                      </View>
                    </View>
                  </ThemedView>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: Size.calcHeight(20) }} />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </ThemedView>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default ChitChatScreen;

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
    position: "relative",
    borderTopLeftRadius: Size.calcWidth(30),
    borderTopRightRadius: Size.calcWidth(30),
    justifyContent: "space-between",
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

  headerTitle: {
    fontSize: Size.calcWidth(18),
    fontWeight: "medium",
    textAlign: "left",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
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

  featuresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Size.calcWidth(28),
  },

  featuretext: {
    fontSize: Size.calcWidth(14),
    fontWeight: "semibold",
  },

  icon: {
    width: Size.calcWidth(36),
    height: Size.calcHeight(36),
  },

  language: {
    flexDirection: "row",
    padding: Size.calcWidth(15),
    width: "100%",
    borderRadius: Size.calcWidth(16),
  },

  addButton: {
    backgroundColor: "#592E83",
    borderRadius: Size.calcWidth(38),
    padding: Size.calcWidth(15),
    justifyContent: "center",
    position: "absolute",
    right: 28,
    bottom: Size.calcHeight(100),
    width: Size.calcWidth(62),
    height: Size.calcHeight(62),
    alignItems: "center",
  },
});
