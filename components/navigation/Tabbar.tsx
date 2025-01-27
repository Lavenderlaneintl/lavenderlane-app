import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { tabItemType } from "@/utils/interfaces/nav.interfaces";
import Size from "@/utils/hooks/useResponsiveSize";

import HomeIcon from "./Icons/HomeIcon";
import CalenderIcon from "./Icons/CalenderIcon";
import ExploreIcon from "./Icons/ExploreIcon";
import NotificationIcon from "./Icons/NotificationIcon";
import SettingsIcon from "./Icons/SettingsIcon";

// nav links
const navItems: tabItemType[] = [
  {
    name: "/DashboardScreen",
    icon: HomeIcon,
    label: "Dashboard",
  },
  {
    name: "/CalenderScreen",
    icon: CalenderIcon,
    label: "Calendar",
  },
  {
    name: "/ExploreScreen",
    icon: ExploreIcon,
    label: "Explore",
  },
  {
    name: "/NotificationScreen",
    icon: NotificationIcon,
    label: "Notification",
  },
  {
    name: "/SettingsScreen",
    icon: SettingsIcon,
    label: "Settings",
  },
];

const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {navItems.map((tabItem) => {
        const route = state.routes.find((route) => route.name === tabItem.name);
        const isFocused = route
          ? descriptors[route.key]?.navigation?.isFocused()
          : false;

        return (
          <TouchableOpacity
            key={tabItem.label}
            style={[
              styles.tabIcon,
              isFocused && {
                backgroundColor: "#592E83",
              },
            ].filter(Boolean)}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route?.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                router.push(tabItem.name);
              }
            }}
          >
            <tabItem.icon iconColor={isFocused ? "#F9F9F9" : "#9CA0AF"} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEEF1",
    borderTopWidth: 0,
    elevation: 4,
    bottom: 40,
    height: Size.calcHeight(70),
    width: "87%",
    marginHorizontal: "auto",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  tabIcon: {
    width: Size.calcAverage(55),
    height: Size.calcAverage(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Size.calcAverage(40),
  },
});
