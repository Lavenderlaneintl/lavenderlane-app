import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Size from "@/utils/hooks/useResponsiveSize";
import { chitchatOptions } from "@/utils/data";
import { useThemeColor } from "@/utils/hooks/useThemeColor";
import { IChitChatOptions } from "@/utils/interfaces/index.interfaces";
import ThemedBottomSheet, {
  ThemedBottomSheetHandle,
} from "@/components/BottomSheet";
import AppButton from "@/components/AppButton";
import SensitiveSvg from "@/assets/svgs/Sensitive";

const ChitChatScreen = (): JSX.Element => {
  const cardColor = useThemeColor({ colorName: "card" });
  const router = useRouter();
  const sheetRef = useRef<ThemedBottomSheetHandle>(null);

  const renderItem = ({ item }: { item: IChitChatOptions }) => (
    <TouchableOpacity
      onPress={() =>
        item.title.includes("Sensitive")
          ? sheetRef.current?.expand()
          : router.push(item.route)
      }
    >
      <ThemedView style={[styles.language, { backgroundColor: cardColor }]}>
        <View style={styles.itemContainer}>
          <item.icon
            style={styles.icon}
            iconColor={item.id === 1 ? "#F700F6" : "#0CBCF2"}
          />
          <View>
            <ThemedText
              style={[styles.featureText, { fontSize: Size.calcAverage(19) }]}
              lightColor="#373D51"
            >
              {item.title}
            </ThemedText>
            <ThemedText style={styles.featureText} lightColor="#373D51">
              {item.description}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <>
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
                <ThemedText style={styles.headerTitle}>Chit-Chat</ThemedText>
              </ThemedView>
            </View>
            <FlatList
              data={chitchatOptions}
              renderItem={renderItem}
              ItemSeparatorComponent={() => (
                <View style={{ height: Size.calcHeight(20) }} />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ThemedView>
      </ThemedView>
      <ThemedBottomSheet
        ref={sheetRef}
        snapPoints={[Size.calcHeight(420)]}
        title="Sensitive talk"
      >
        <View style={styles.popWrapper}>
          <SensitiveSvg />
          <ThemedText
            style={[styles.popWrapperText, { fontSize: Size.calcAverage(19) }]}
            lightColor="#373D51"
          >
            What’s on your mind? Start a conversation
          </ThemedText>
          <ThemedText style={styles.popWrapperText} lightColor="#373D51">
            You’re about to start a sensitive conversation. Please send your
            messages in love
          </ThemedText>
          <AppButton
            title="Noted!"
            style={{
              marginTop: Size.calcHeight(20),
            }}
            onPress={() => router.push("/ChitChatScreen/SensitiveTalkScreen")}
          />
        </View>
      </ThemedBottomSheet>
    </>
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

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Size.calcWidth(15),
  },

  featureText: {
    fontSize: Size.calcWidth(14),
    fontWeight: "600",
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

  popWrapper: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: Size.calcHeight(20),
  },

  popWrapperText: {
    textAlign: "center",
    marginTop: Size.calcHeight(12),
  },
});
