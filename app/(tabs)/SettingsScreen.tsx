import CustomSwitch from "@/components/AppSwitch";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { settingsOptions } from "@/utils/data";
import useLogout from "@/utils/hooks/useLogout";
import Size from "@/utils/hooks/useResponsiveSize";
import { useUserStore } from "@/utils/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsScreen = () => {
  const logout = useLogout();

  const { authData } = useUserStore();
  const token = authData;
  
  console.log("token", token);
  

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView lightColor="#F9F9F9" style={styles.exploreheader}>
        <ThemedText type="title" style={styles.title}>
          Settings
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={{
          padding: Size.calcWidth(20),
          flex: 1
        }}
      >
        <FlatList
          data={settingsOptions}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={() => (
            <View style={{ height: Size.calcHeight(13) }} />
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                !item.title.includes("Log out")
                  ? item.link && router.push(item.link as any)
                  : logout()
              }
            >
              <ThemedView lightColor="#F4F4F6" style={styles.option}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: Size.calcWidth(12),
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{
                      height: Size.calcHeight(44),
                      width: Size.calcWidth(44),
                    }}
                  />

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <ThemedText>{item.title}</ThemedText>
                      {item.comingSoon && (
                        <View style={styles.comingSoonPill}>
                          <Text style={styles.comingSoonText}>Coming Soon</Text>
                        </View>
                      )}
                    </View>
                    <ThemedText lightColor="#9CA0AF">
                      {item.subtitle}
                    </ThemedText>
                  </View>
                </View>

                {!item.title.includes("Log out") &&
                  (item.toggle ? (
                    <CustomSwitch value={false} onValueChange={() => {}} />
                  ) : (
                    <Ionicons
                      name="chevron-forward-outline"
                      color={`#49536E`}
                      size={Size.calcWidth(28)}
                    />
                  ))}
              </ThemedView>
            </TouchableOpacity>
          )}
          ListFooterComponent={() => (
            <View style={{ height: Size.calcHeight(100) }} />
          )}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: Size.calcWidth(20),
    fontWeight: "semibold",
    textAlign: "left",
  },

  exploreheader: {
    padding: Size.calcAverage(20),
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Size.calcWidth(15),
    borderRadius: Size.calcWidth(16),
  },

  optionTitle: {
    fontSize: Size.calcAverage(16),
    fontWeight: "semibold",
  },

  optionSubtitle: {
    fontSize: Size.calcAverage(14),
    fontWeight: "semibold",
  },

  comingSoonPill: {
    padding: Size.calcWidth(5),
    backgroundColor: "#592E83",
    borderRadius: Size.calcWidth(12),
  },

  comingSoonText: {
    color: "white",
    fontSize: Size.calcWidth(7),
    fontWeight: "semibold",
  },
});
